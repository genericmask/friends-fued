<template>
  <div class="app">
    <div class="wrapper" v-if="!gameState.showQuestion">
      <div class="team-score-container left-score">
        <div class="team-score">{{ team1Score }}</div>
        <div class="team-name">{{ gameState.team1?.name }}</div>
      </div>
      <div class="game-board">
        <div class="score-container">
          <div class="score">{{ currentScore }}</div>
        </div>
        <div class="answers">
          <div class="answer-row answer-row-box" v-for="(answer, index) in answers" :key="index" :class="'answer-row-' + (index + 1)">
            <template v-if="answer.text" >
              <template v-if="answer.revealed">
                <div class="answer">{{ answer.text }}</div>
                <div class="points">{{ answer.points }}</div>
              </template>
              <template v-else>
                <div class="row-number">{{ index + 1 }}</div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="team-score-container right-score">
        <div class="team-score">{{ team2Score }}</div>
        <div class="team-name">{{ gameState.team2?.name }}</div>
      </div>
      <div v-if="strikeImage" class="strike-overlay">
        <img :src="strikeImage" class="strike-image" />
      </div>
    </div>
    <div v-else class="question">
      {{ question }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const gameState = ref(({}));
const answers = ref([]);
const currentScore = ref(0);
const team1Score = ref(0);
const team2Score = ref(0);
const strikes = ref(0);
const strikeImage = ref(null);
const question = ref("");

const dingSound = new Audio('good-answer.mp3');
const errrSound = new Audio('negative-buzzer.mp3');

const eventSource = ref(null);

const handleSSE = (event) => {
  if (event.data === 'heartbeat') {
    console.log('Received heartbeat');
    return;
  }

  const data = JSON.parse(event.data);
  const previousScore = currentScore.value;
  const previousStrikes = strikes.value;

  answers.value = data.rounds[data.currentRound].answers;
  currentScore.value = data.rounds[data.currentRound].points;
  team1Score.value = data.team1.score;
  team2Score.value = data.team2.score;
  strikes.value = data.rounds[data.currentRound].strikes;
  gameState.value = data;
  question.value = data.rounds[data.currentRound].question;

  if (strikes.value !== previousStrikes && strikes.value !== 0) {
    errrSound.play();
    if (strikes.value > 0 && strikes.value < 4) {
      strikeImage.value = `strike${strikes.value}.png`;
      setTimeout(() => {
        strikeImage.value = null;
      }, 2000);
    }
  } else if (currentScore.value > previousScore) {
    dingSound.play();
  }
};

onMounted(() => {
  eventSource.value = new EventSource(window.location.origin + '/api/view');
  eventSource.value.onmessage = handleSSE;
});

onUnmounted(() => {
  if (eventSource.value) {
    eventSource.value.close();
  }
});
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

.question {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw; /* Ensure full viewport width */
  background-color:#2c3e50;
  color: white;
  font-size: 10rem;
}

.team-score-container {
  display: flex;
  flex-direction: column; /* Ensure vertical stacking */
  align-items: center;
  height: 100%;
  min-width: 15rem;
  width: auto;
  background-color: #08aafa;
  padding: 0.625rem; /* 10px equivalent */
  border-radius: 0.3125rem; /* 5px equivalent */
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
  display: inline-block;
  text-align: center;
}

.team-name {
  font-size: 4rem;
  color: white; /* Ensure the text is white */
  text-align: center;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
  flex-grow: 1;
  align-content: stretch;
}

.answer-row-1 {
  grid-column: 1;
  grid-row: 1;
}

.answer-row-2 {
  grid-column: 1;
  grid-row: 2;
}

.answer-row-3 {
  grid-column: 1;
  grid-row: 3;
}

.answer-row-4 {
  grid-column: 1;
  grid-row: 4;
}

.answer-row-5 {
  grid-column: 2;
  grid-row: 1;
}

.answer-row-6 {
  grid-column: 2;
  grid-row: 2;
}

.answer-row-7 {
  grid-column: 2;
  grid-row: 3;
}

.answer-row-8 {
  grid-column: 2;
  grid-row: 4;
}

.answer-row {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  border-radius: 5px;
  align-items: center;
  height: 10vh;
}

.answer-row-box {
  border: 3px solid silver;
  background-color: #34495e;
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

.strike-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.strike-image {
  width: 50%;
}
</style>
