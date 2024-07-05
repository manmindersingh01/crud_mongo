import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './Routes/user.js';  // Ensure the path is correct
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// ES modules solution for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The root directory of your project
const rootDir = path.resolve(__dirname, '..');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/user', userRoute);

// Serve static files from the client/dist folder
const staticPath = path.join(rootDir, 'client', 'dist');
console.log(`Serving static files from: ${staticPath}`);  // Debugging log
app.use(express.static(staticPath));

// Handle SPA (Single Page Application)
app.get('*', (req, res) => {
  const indexPath = path.resolve(rootDir, 'client', 'dist', 'index.html');
  console.log(`Serving index.html from: ${indexPath}`);  // Debugging log
  res.sendFile(indexPath);
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
