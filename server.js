const express = require('express');
const app = express();
const path = require('path');

// Configurar middleware para servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Resto de la configuración del servidor...

app.listen(3000, () => {
  console.log('Servidor web en ejecución en http://localhost:3000');
});

