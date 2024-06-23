import State, { IState } from './stateModel';

const getState = async (): Promise<IState | null> => {
  return await State.findOne().exec();
};

const setCurrentGameId = async (gameId: string): Promise<IState> => {
  let state = await getState();
  if (!state) {
    state = new State({ currentGameId: gameId });
  } else {
    state.currentGameId = gameId;
  }
  return await state.save();
};

export default { getState, setCurrentGameId };
