import Game, { IGame } from './gameModel';

const getGame = async (): Promise<IGame | null> => {
  return await Game.findOne().exec();
};

const saveGame = async (gameData: any): Promise<IGame> => {
  let game = await getGame();
  if (!game) {
    game = new Game({ state: gameData });
  } else {
    game.state = gameData;
  }
  return await game.save();
};

export default { getGame, saveGame };
