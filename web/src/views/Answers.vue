<template>
    <div class="answer-row" v-for="(answer, index) in gameState.answers" :key="index">
        {{ answer }}
    </div>
</template>

<script setup lang="ts">
import { useGameStateStore } from '@/stores/GameState';

const gameState = useGameStateStore();

</script>