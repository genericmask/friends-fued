import gameRepository from './gameRepository';

const getGameState = async (): Promise<any> => {
  const game = await gameRepository.getGame();
  return game ? game.state : null;
};

const saveGameState = async (gameData: any): Promise<any> => {
  const savedGame = await gameRepository.saveGame(gameData);
  return savedGame.state;
};

export default { getGameState, saveGameState };
