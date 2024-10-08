import { Request, Response } from 'express';
import gameService from '../game/gameService';

const clients: Response[] = [];

const stream = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Set CORS header for SSE

  // Send a heartbeat every 20 seconds
  const heartbeatInterval = setInterval(() => {
    res.write(`data: heartbeat\n\n`);
  }, 20000);

  clients.push(res);

  try {
    const gameData = await gameService.getGameState();
    res.write(`data: ${JSON.stringify(gameData)}\n\n`);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.write(`data: ${JSON.stringify({ error: 'Error fetching game data' })}\n\n`);
  }

  req.on('close', () => {
    clients.splice(clients.indexOf(res), 1);
  });
};

const sendEvent = (event: any) => {
  clients.forEach(client => client.write(`data: ${JSON.stringify(event)}\n\n`));
};

export default { stream, sendEvent };
