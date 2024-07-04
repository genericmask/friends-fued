import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../openapi.json');
import dotenv from 'dotenv';
import gameRoutes from './game/gameRoutes';
import sseManager from './sse/sseManager';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://0.0.0.0:8080', // Your frontend origin
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions)); // Enable CORS with options

app.use(bodyParser.json());

const mongoURI = process.env.mongoURI || 'mongodb://mongo:27017/gamedb';
mongoose.connect(mongoURI).then(() => (console.log("Successfully connected to " + mongoURI)), (e) => console.error(e));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/game', gameRoutes);

// TODO: Have multiple sessions that can be viewed. As of right now, only one game can be played at a time
app.get('/api/view', sseManager.stream);

app.use(errorHandler);

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});
