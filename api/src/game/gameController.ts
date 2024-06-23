import { Request, Response, NextFunction } from 'express';
import gameService from './gameService';
import sseManager from '../sse/sseManager';

const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await gameService.createGame(req.body);
    res.status(201).json(game);
  } catch (error) {
    next(error);
  }
};

const getGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const game = await gameService.getGame(gameId);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const game = await gameService.updateGame(gameId, req.body);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    await gameService.deleteGame(gameId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const addRoundToGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const round = await gameService.addRoundToGame(gameId, req.body);
    res.status(201).json(round);
  } catch (error) {
    next(error);
  }
};

const updateRoundOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const game = await gameService.updateRoundOrder(gameId, req.body.roundOrder);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const updateTeamName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId, teamId } = req.params;
    const team = await gameService.updateTeamName(gameId, teamId, req.body.name);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

const updateTeamScore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId, teamId } = req.params;
    const team = await gameService.updateTeamScore(gameId, teamId, req.body.score);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
};

const switchActiveRound = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const game = await gameService.switchActiveRound(gameId, req.body.roundIndex);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

const getPastGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await gameService.getPastGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

const resetGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const game = await gameService.resetGame(gameId);
    sseManager.sendEvent({ type: 'RESET_GAME', data: game });
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

export default {
  createGame,
  getGame,
  updateGame,
  deleteGame,
  addRoundToGame,
  updateRoundOrder,
  updateTeamName,
  updateTeamScore,
  switchActiveRound,
  getPastGames,
  resetGame
};
