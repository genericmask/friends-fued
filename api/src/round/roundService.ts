import roundRepository from './roundRepository';
import { IRound } from './roundModel';

const createRound = async (roundData: IRound) => {
  return await roundRepository.createRound(roundData);
};

const updateRound = async (roundId: string, roundData: Partial<IRound>) => {
  return await roundRepository.updateRound(roundId, roundData);
};

const deleteRound = async (roundId: string) => {
  return await roundRepository.deleteRound(roundId);
};

const getRound = async (roundId: string) => {
  return await roundRepository.getRound(roundId);
};

export default { createRound, updateRound, deleteRound, getRound };
