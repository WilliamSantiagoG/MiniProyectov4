// Importar App e iniciar servidor
import dotenv from 'dotenv';
import app from './app.js';

// Cargar variables de entorno desde archivo .env
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor en http://localhost:3000');
});
