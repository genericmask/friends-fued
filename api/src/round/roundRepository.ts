import Round, { IRound } from './roundModel';

const createRound = async (roundData: IRound) => {
  const round = new Round(roundData);
  return await round.save();
};

const updateRound = async (roundId: string, roundData: Partial<IRound>) => {
  return await Round.findByIdAndUpdate(roundId, roundData, { new: true }).exec();
};

const deleteRound = async (roundId: string) => {
  await Round.findByIdAndDelete(roundId).exec();
};

const getRound = async (roundId: string) => {
  return await Round.findById(roundId).exec();
};

export default { createRound, updateRound, deleteRound, getRound };
