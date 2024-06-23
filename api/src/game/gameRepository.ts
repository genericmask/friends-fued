import mongoose from 'mongoose';
import Game, { IGame } from './gameModel';
import Round from '../round/roundModel';
import Team from '../team/teamModel';

const createGame = async (gameData: IGame) => {
  const game = new Game(gameData);
  return await game.save();
};

const getGame = async (gameId: string) => {
  return await Game.findById(gameId).populate('rounds').populate('teams').exec();
};

const updateGame = async (gameId: string, gameData: Partial<IGame>) => {
  return await Game.findByIdAndUpdate(gameId, gameData, { new: true }).exec();
};

const deleteGame = async (gameId: string) => {
  await Game.findByIdAndDelete(gameId).exec();
};

const addRoundToGame = async (gameId: string, roundData: any) => {
  const round = new Round(roundData);
  await round.save();
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  game.rounds.push(round.id);
  return await game.save();
};

const updateRoundOrder = async (gameId: string, roundOrder: string[]) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  game.rounds = roundOrder.map(id => new mongoose.Types.ObjectId(id));
  return await game.save();
};

const updateTeamName = async (gameId: string, teamId: string, name: string) => {
  const team = await Team.findByIdAndUpdate(teamId, { name }, { new: true }).exec();
  if (!team) throw new Error('Team not found');
  return team;
};

const updateTeamScore = async (gameId: string, teamId: string, score: number) => {
  const team = await Team.findByIdAndUpdate(teamId, { score }, { new: true }).exec();
  if (!team) throw new Error('Team not found');
  return team;
};

const switchActiveRound = async (gameId: string, roundIndex: number) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');
  game.currentRound = roundIndex;
  return await game.save();
};

const getPastGames = async () => {
  return await Game.find().sort({ createdAt: -1 }).exec();
};

const resetGame = async (sessionId: string) => {
  const game = await Game.findById(sessionId).populate('rounds').populate('teams');
  if (!game) throw new Error('Game not found');

  game.rounds.forEach((round: any) => {
    round.strikes = 0;
    round.answers.forEach((answer: any) => {
      answer.revealed = false;
    });
    round.save();
  });

  game.teams.forEach((team: any) => {
    team.score = 0;
    team.save();
  });

  game.currentRound = 0;
  return await game.save();
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
