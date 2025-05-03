
import { Router } from "express";
import { createServer } from "http";

export async function registerRoutes(app: express.Express) {
  const server = createServer(app);
  const router = Router();

  // Suas rotas aqui
  router.get('/api/health', (_, res) => {
    res.json({ status: 'ok' });
  });

  app.use(router);
  return server;
}
