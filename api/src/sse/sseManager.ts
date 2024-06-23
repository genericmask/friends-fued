import { Request, Response } from 'express';
import gameService from '../game/gameService';

let clients: Response[] = new Array;

const stream = async (req: Request, res: Response) => {
  console.log("New stream request");
  clients.push(res);
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const gameData = await gameService.getGame();
    res.write(`data: ${JSON.stringify(gameData)}\n\n`);
  } catch (error) {
    console.error('Error fetching game data:', error);
    res.write(`data: ${JSON.stringify({ error: 'Error fetching game data' })}\n\n`);
  }

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
};

const sendEvent = (event: any) => {
  console.log("Sending event to stream subscribers: " + event);
  clients.forEach(client => client.write(`data: ${JSON.stringify(event)}\n\n`));
};

export default { stream, sendEvent };
