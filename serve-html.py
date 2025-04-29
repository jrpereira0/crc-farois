import http.server
import socketserver
import os

# Definir o diretório como html-site
os.chdir('html-site')

PORT = 5000
Handler = http.server.SimpleHTTPRequestHandler

print(f"Servindo o site estático CRC Faróis da pasta 'html-site' na porta {PORT}")
print(f"Acesse: http://localhost:{PORT}")

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Servidor iniciado. Pressione Ctrl+C para parar.")
    httpd.serve_forever()