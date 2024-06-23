import Team, { ITeam } from './teamModel';

const createTeam = async (teamData: ITeam) => {
  const team = new Team(teamData);
  return await team.save();
};

const updateTeam = async (teamId: string, teamData: Partial<ITeam>) => {
  return await Team.findByIdAndUpdate(teamId, teamData, { new: true }).exec();
};

const deleteTeam = async (teamId: string) => {
  await Team.findByIdAndDelete(teamId).exec();
};

const getTeam = async (teamId: string) => {
  return await Team.findById(teamId).exec();
};

export default { createTeam, updateTeam, deleteTeam, getTeam };
