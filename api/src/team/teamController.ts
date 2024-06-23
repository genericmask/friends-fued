import teamRepository from './teamRepository';
import { ITeam } from './teamModel';

const createTeam = async (teamData: ITeam) => {
  return await teamRepository.createTeam(teamData);
};

const updateTeam = async (teamId: string, teamData: Partial<ITeam>) => {
  return await teamRepository.updateTeam(teamId, teamData);
};

const deleteTeam = async (teamId: string) => {
  return await teamRepository.deleteTeam(teamId);
};

const getTeam = async (teamId: string) => {
  return await teamRepository.getTeam(teamId);
};

export default { createTeam, updateTeam, deleteTeam, getTeam };
