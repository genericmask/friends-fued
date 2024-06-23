import stateRepository from './stateRepository';

const getCurrentGameId = async (): Promise<string | null> => {
  const state = await stateRepository.getState();
  return state ? state.currentGameId : null;
};

const setCurrentGameId = async (gameId: string): Promise<void> => {
  await stateRepository.setCurrentGameId(gameId);
};

export default { getCurrentGameId, setCurrentGameId };
