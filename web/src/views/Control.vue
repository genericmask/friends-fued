<template>
    <div class="app">
      <div class="wrapper">
        <div class="team-score-container left-score">
          <div class="team-score">{{ team1Score }}</div>
        </div>
        <div class="game-board">
          <div class="score-container">
            <div class="score">{{ currentScore }}</div>
          </div>
          <div class="answers">
            <div class="answer-row" v-for="(answer, index) in gameState.answers" :key="index" @dblclick="toggleAnswer(answer)">
              <template v-if="answer.revealed">
                <div @click="editAnswer(answer)">
                  <template v-if="answer.isEditing">
                    <input v-model="answer.text" @blur="saveAnswer(answer)" @keyup.enter="saveAnswer(answer)">
                  </template>
                  <template v-else>
                    <div class="answer">{{ answer.text }}</div>
                  </template>
                </div>
                <div @click="editScore(answer)">
                  <template v-if="answer.isEditingScore">
                    <input v-model.number="answer.points" @blur="saveScore(answer)" @keyup.enter="saveScore(answer)">
                  </template>
                  <template v-else>
                    <div class="points">{{ answer.points }}</div>
                  </template>
                </div>
              </template>
              <div v-else class="row-number">{{ index + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="team-score-container right-score">
          <div class="team-score">{{ team2Score }}</div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref } from 'vue';
  import { useGameStateStore } from '@/stores/GameState';

  const gameState = useGameStateStore();
  
  gameState.answers = [
    { text: 'FLIGHT', points: 48, revealed: true, isEditing: false, isEditingScore: false },
    { text: 'TELEPORTATION', points: 11, revealed: true, isEditing: false, isEditingScore: false },
    { text: 'INVISIBILITY', points: 9, revealed: true, isEditing: false, isEditingScore: false },
    { text: 'LASER EYES', points: '', revealed: false, isEditing: false, isEditingScore: false },
    { text: 'X-RAY VISION', points: '', revealed: false, isEditing: false, isEditingScore: false },
    { text: 'OMNISCIENCE', points: 7, revealed: false, isEditing: false, isEditingScore: false },
    { text: 'STRENGTH', points: 5, revealed: true, isEditing: false, isEditingScore: false },
    { text: 'IMMORTALITY', points: 5, revealed: true, isEditing: false, isEditingScore: false },
  ];
  
  const currentScore = ref(73);
  const team1Score = ref(0);
  const team2Score = ref(0);
  
  const toggleAnswer = (answer) => {
    if (answer.isEditing || answer.isEditingScore) return; // Prevent toggle if editing
    if (answer.revealed) {
      currentScore.value -= answer.points;
    } else {
      currentScore.value += answer.points;
    }
    answer.revealed = !answer.revealed;
  };
  
  const editAnswer = (answer) => {
    answer.isEditing = true;
  };
  
  const saveAnswer = (answer) => {
    answer.isEditing = false;
  };
  
  const editScore = (answer) => {
    answer.isEditingScore = true;
  };
  
  const saveScore = (answer) => {
    answer.isEditingScore = false;
  };
  </script>
  
  <style scoped>
  :root {
    font-size: 16px; /* Base font size for rem units */
  }
  
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; /* Optional: prevents scrolling if content overflows */
  }
  
  .app {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw; /* Ensure full viewport width */
  }
  
  .wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
  }
  
  .team-score-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .left-score {
    margin-left: 0rem;
  }
  
  .right-score {
    margin-left: 0rem;
  }
  
  .team-score {
    font-size: 12rem;
    color: white; /* Changed color to white */
    background-color: #08aafa;
    padding: 0.625rem; /* 10px equivalent */
    border-radius: 0.3125rem; /* 5px equivalent */
    display: inline-block;
    text-align: center;
    width: 15rem;
  }
  
  .game-board {
    width: 60%; /* Percentage-based width */
    height: 80vh; /* Viewport height-based height */
    padding: 1.25rem; /* 20px equivalent */
    border-radius: 0.625rem; /* 10px equivalent */
    background-color: #2c3e50;
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5); /* 10px equivalent */
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 0.3125rem solid gold; /* 5px equivalent */
  }
  
  .score-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.25rem;
  }
  
  .score {
    font-size: 7rem;
    text-align: center;
    background-color: #08aafa;
    padding: 0.625rem; /* 10px equivalent */
    border-radius: 0.3125rem; /* 5px equivalent */
    display: inline-block;
  }
  
  .answers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
    flex-grow: 1;
    align-content: stretch; /* Ensure the answers section stretches */
  }
  
  .answer-row {
    display: flex;
    justify-content: space-between;
    background-color: #34495e;
    padding: 18px; /* Adjusted padding */
    border-radius: 5px; /* 5px equivalent */
    align-items: center;
    border: 3px solid silver; /* Gold border for answer rows */
    height: 12vh; /* Adjusted height to be taller */
    cursor: pointer; /* Add cursor to indicate clickability */
  }
  
  .answer {
    font-size: 3.5rem;
    flex-grow: 1;
  }
  
  .row-number {
    font-size: 7rem;
    background-color: #2980b9;
    color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px; /* 5px equivalent */
  }
  
  .points {
    border: 2px solid silver;
    font-size: 7rem;
    background-color: #2980b9;
    padding: 5px 10px; /* 5px 10px equivalent */
    border-radius: 5px; /* 5px equivalent */
    margin-left: 5px; /* 5px equivalent */
    flex-shrink: 0;
    width: 7rem;
    text-align: right;
  }
  </style>
  