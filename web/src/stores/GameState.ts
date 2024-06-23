import type { Round } from '@/models/Round';
import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useGameStateStore = defineStore('gameState', () => {
    const teams = ref<Map<string, number>>(new Map());
    const rounds = ref<Round[]>();
    const answers = ref();

    function addPointsToTeamScore(teamName: string, points: number): number {
        if (teams.value.has(teamName)) {
            let score = teams.value.get(teamName) || 0;
            score += points;
            teams.value.set(teamName, score);
            return score;
        } else {
            throw Error("Team " + teamName + " is undefined!");
        }
    }

    function getTeams() {
        teams.value.set("Team 1", 0);
        return Array.from(teams.value.values());
    }

    return { teams, addPointsToTeamScore, getTeams, answers }
})