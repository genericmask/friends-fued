import gameRepository from './gameRepository';
import { IGame } from './gameModel';

const createGame = async (gameData: IGame) => {
  return await gameRepository.createGame(gameData);
};

const getGame = async (gameId: string) => {
  return await gameRepository.getGame(gameId);
};

const updateGame = async (gameId: string, gameData: Partial<IGame>) => {
  return await gameRepository.updateGame(gameId, gameData);
};

const deleteGame = async (gameId: string) => {
  return await gameRepository.deleteGame(gameId);
};

const addRoundToGame = async (gameId: string, roundData: any) => {
  return await gameRepository.addRoundToGame(gameId, roundData);
};

const updateRoundOrder = async (gameId: string, roundOrder: string[]) => {
  return await gameRepository.updateRoundOrder(gameId, roundOrder);
};

const updateTeamName = async (gameId: string, teamId: string, name: string) => {
  return await gameRepository.updateTeamName(gameId, teamId, name);
};

const updateTeamScore = async (gameId: string, teamId: string, score: number) => {
  return await gameRepository.updateTeamScore(gameId, teamId, score);
};

const switchActiveRound = async (gameId: string, roundIndex: number) => {
  return await gameRepository.switchActiveRound(gameId, roundIndex);
};

const getPastGames = async () => {
  return await gameRepository.getPastGames();
};

const resetGame = async (sessionId: string) => {
  return await gameRepository.resetGame(sessionId);
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
