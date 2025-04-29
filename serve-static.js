const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Serve static files from the html-site directory
app.use(express.static(path.join(__dirname, 'html-site')));

// Route all requests to index.html for direct path access
app.get('/*', (req, res) => {
  const requestPath = req.path;
  
  // Check if the request is for a specific HTML page
  if (requestPath.endsWith('.html') || requestPath === '/') {
    const filePath = requestPath === '/' ? '/index.html' : requestPath;
    res.sendFile(path.join(__dirname, 'html-site', filePath));
  } else if (requestPath.includes('.')) {
    // This is a file request (like CSS, JS, images)
    res.sendFile(path.join(__dirname, 'html-site', requestPath));
  } else {
    // This is likely a "pretty URL" that should serve an HTML file
    res.sendFile(path.join(__dirname, 'html-site', `${requestPath}.html`));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado! Site estático CRC Faróis rodando na porta ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});