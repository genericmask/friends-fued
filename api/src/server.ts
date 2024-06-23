import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../openapi.json');
import dotenv from 'dotenv';
import gameRoutes from './game/gameRoutes';
import roundRoutes from './round/roundRoutes';
import teamRoutes from './team/teamRoutes';
import sseManager from './sse/sseManager';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const mongoURI = process.env.mongoURI || 'mongodb://mongo:27017/gamedb';
mongoose.connect(mongoURI).then(() => (console.log("Successfully connected to " + mongoURI)), (e) => console.error(e));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/games', gameRoutes);
app.use('/api/rounds', roundRoutes);
app.use('/api/teams', teamRoutes);

// TODO: Have multiple sessions that can be viewed. As of right now, only one game can be played at a time
app.get('/api/view', sseManager.stream);

app.use(errorHandler);

const port = process.env.apiPort || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
