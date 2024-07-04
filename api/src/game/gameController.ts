import { Request, Response, NextFunction } from 'express';
import gameService from './gameService';
import sseManager from '../sse/sseManager';

const getGameState = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const state = await gameService.getGameState();
    res.status(200).json(state);
  } catch (error) {
    next(error);
  }
};

const saveGameState = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newState = await gameService.saveGameState(req.body);
    sseManager.sendEvent(newState);  // Send the updated state to all clients
    res.status(200).json(newState);
  } catch (error) {
    next(error);
  }
};

export default { getGameState, saveGameState };
