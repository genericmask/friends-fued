import { Request, Response, NextFunction } from 'express';
import roundService from './roundService';
import sseManager from '../sse/sseManager';

const createRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const round = await roundService.createRound(req.body);
    res.status(201).json(round);
  } catch (error) {
    next(error);
  }
};

const updateRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId } = req.params;
    const round = await roundService.updateRound(roundId, req.body);
    res.status(200).json(round);
  } catch (error) {
    next(error);
  }
};

const deleteRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId } = req.params;
    await roundService.deleteRound(roundId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const getRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roundId } = req.params;
    const round = await roundService.getRound(roundId);
    res.status(200).json(round);
  } catch (error) {
    next(error);
  }
};

export default { createRound, updateRound, deleteRound, getRound };
