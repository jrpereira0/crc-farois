import { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import { db } from "./db";
import { users, LoginCredentials, RegisterUser } from "@shared/schema";
import { eq } from "drizzle-orm";
import { pool } from "./db";

// Definição de usuário para o Passport
interface UserType {
  id: number;
  username: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface User extends UserType {}
  }
}

export function setupAuth(app: Express) {
  // Configurar session store com PostgreSQL
  const PostgresStore = connectPg(session);
  const sessionStore = new PostgresStore({
    pool,
    tableName: 'session',
    createTableIfMissing: true // Criar a tabela se não existir
  });

  // Configurar middleware de sessão
  app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "segredo-temporario-para-desenvolvimento",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 dia
        secure: process.env.NODE_ENV === "production",
      }
    })
  );

  // Inicializar passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configurar estratégia local
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Buscar usuário no banco de dados
        const [user] = await db.select().from(users).where(eq(users.username, username));
        
        if (!user) {
          return done(null, false, { message: "Usuário não encontrado" });
        }

        // Verificar senha
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Senha incorreta" });
        }

        // Autenticação bem sucedida
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serializar e deserializar usuário
  passport.serializeUser((user: Express.User, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      if (!user) {
        // Se o usuário não existe mais, retorne null sem erro
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Rota de login
  app.post("/api/login", (req: Request, res: Response, next: NextFunction) => {
    console.log("Tentativa de login - Dados recebidos:", { username: req.body.username });
    
    passport.authenticate("local", (err: Error, user: Express.User, info: { message: string }) => {
      if (err) {
        console.error("Erro na autenticação:", err);
        return next(err);
      }
      
      if (!user) {
        console.log("Login falhou:", info.message || "Credenciais inválidas");
        return res.status(401).json({ message: info.message || "Credenciais inválidas" });
      }
      
      console.log("Usuário autenticado, iniciando sessão:", { id: user.id, username: user.username });
      
      req.logIn(user, (err) => {
        if (err) {
          console.error("Erro ao iniciar sessão:", err);
          return next(err);
        }
        
        console.log("Sessão iniciada com sucesso para:", { id: user.id, username: user.username });
        
        return res.json({
          id: user.id,
          username: user.username,
          name: user.name,
          isAdmin: user.isAdmin
        });
      });
    })(req, res, next);
  });

  // Rota de logout
  app.post("/api/logout", (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao fazer logout" });
      }
      res.json({ message: "Logout realizado com sucesso" });
    });
  });

  // Rota para verificar autenticação
  app.get("/api/me", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autenticado" });
    }
    
    const user = req.user as Express.User;
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      isAdmin: user.isAdmin
    });
  });

  // Rota de registro (apenas para desenvolvimento - em produção você pode querer remover ou proteger isso)
  app.post("/api/register", async (req: Request, res: Response) => {
    try {
      const { username, password, name } = req.body as RegisterUser;
      
      // Verificar se o usuário já existe
      const [existingUser] = await db.select().from(users).where(eq(users.username, username));
      if (existingUser) {
        return res.status(400).json({ message: "Nome de usuário já está em uso" });
      }
      
      // Hash da senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      // Criar novo usuário
      const [newUser] = await db.insert(users).values({
        username,
        password: hashedPassword,
        name,
        isAdmin: true
      }).returning();
      
      // Login automático após o registro
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao fazer login após o registro" });
        }
        
        return res.status(201).json({
          id: newUser.id,
          username: newUser.username,
          name: newUser.name,
          isAdmin: newUser.isAdmin
        });
      });
    } catch (error) {
      console.error("Erro no registro:", error);
      res.status(500).json({ message: "Erro ao registrar usuário" });
    }
  });

  // Middleware para verificar se o usuário é admin
  app.use("/api/admin/*", (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autenticado" });
    }
    
    const user = req.user as Express.User;
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }
    
    next();
  });
}

// Admin relacionado completamente removido