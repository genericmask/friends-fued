<template>
  <div class="game-state-editor">
    <h2>Game State Editor</h2>

    <div>
      <label for="team1">Team 1 Name:</label>
      <input id="team1" v-model="gameState.team1.name" />
      <label for="team1-score">Score:</label>
      <input type="number" id="team1-score" v-model.number="gameState.team1.score" />
    </div>

    <div>
      <label for="team2">Team 2 Name:</label>
      <input id="team2" v-model="gameState.team2.name" />
      <label for="team2-score">Score:</label>
      <input type="number" id="team2-score" v-model.number="gameState.team2.score" />
    </div>

    <div>
      <button @click="toggleShowQuestion">
        <span v-if="gameState.showQuestion">Hide Question</span>
        <span v-else>Show Question</span>
      </button>
    </div>

    <div>
      <h3>Rounds</h3>
      <button @click="addRound">Add Round</button>
      <ul>
        <li v-for="(round, index) in gameState.rounds" :key="index">
          <span>{{ round.question }}</span>
          <button @click="removeRound(index)">Remove Round</button>
          <button @click="setCurrentRound(index)" :disabled="index === gameState.currentRound">
            <span v-if="index === gameState.currentRound">Current Round</span>
            <span v-else>Set Current Round</span>
          </button>
          
        </li>
      </ul>
    </div>

    <div v-if="currentRound">
      <h3>Edit Round {{ gameState.currentRound + 1 }}</h3>
      <div>
        <label for="question">Question:</label>
        <input id="question" v-model="currentRound.question" />
      </div>
      <div>
        <label>Strikes: </label>
        <span>{{ currentRound.strikes }}</span>
        <button @click="incrementStrikes">Add Strike</button>
        <button @click="resetStrikes">Reset Strikes</button>
      </div>
      <div>
        <label>Round Points: </label>
        <input type="number" id="currentround-points" v-model.number="currentRound.points" />
        <button @click="givePointsToTeam('team1')">Give Points to Team 1</button>
        <button @click="givePointsToTeam('team2')">Give Points to Team 2</button>
      </div>
      <div>
        <h4>Answers</h4>
        <ul>
          <li v-for="(answer, index) in currentRound.answers" :key="index">
            {{ index + 1 }}. <input v-model="answer.text" />
            <input type="number" v-model.number="answer.points" />
            <label>
              <input type="checkbox" v-model="answer.revealed" /> Revealed
            </label>
            <button @click="addAnswerPoints(index)">Add Points to Round</button>
          </li>
        </ul>
        <div>
          <button @click="addAnswer" :disabled="currentRound.answers.length >= 8">Add Answer</button>
          <button @click="sortAnswers">Sort Answers</button>
        </div>
      </div>
    </div>

    <div>
      <button @click="saveGameState" style="background-color: rgb(251, 62, 62)">Go Live</button>
      <button @click="exportGameState">Export Game State</button>
      <input type="file" @change="importGameState" />
    </div>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const blankRound = {
      question: "Name a game.",
      answers: [
        {
          text: "Answer",
          points: 8,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        },
        {
          text: "",
          points: 0,
          revealed: false
        }
      ],
      points: 0,
      strikes: 0
    };

const gameState = ref({
  rounds: [
    structuredClone(blankRound)
  ],
  team1: {
    name: "Team 1",
    score: 0
  },
  team2: {
    name: "Team 2",
    score: 0
  },
  currentRound: 0,
  showQuestion: false
});

const errorMessage = ref('');

const currentRound = computed(() => gameState.value.rounds[gameState.value.currentRound]);

const addRound = () => {
  gameState.value.rounds.push(structuredClone(blankRound));
};

const setCurrentRound = (index) => {
  gameState.value.currentRound = index;
};

const removeRound = (index) => {
  gameState.value.rounds.splice(index, 1);
  if (index === gameState.value.currentRound) {
    gameState.value.currentRound = 0;
  } else if (index < gameState.value.currentRound) {
    gameState.value.currentRound--;
  }
};

const addAnswer = () => {
  if (currentRound.value.answers.length < 8) {
    currentRound.value.answers.push({
      text: "",
      points: 0,
      revealed: false
    });
  }
};

const sortAnswers = () => {
  currentRound.value.answers = currentRound.value.answers.sort((a, b) => b.points - a.points);
};

const incrementStrikes = () => {
  currentRound.value.strikes++;
};

const resetStrikes = () => {
  currentRound.value.strikes = 0;
};

const addAnswerPoints = (index) => {
  const answer = currentRound.value.answers[index];
  currentRound.value.points += answer.points;
};

const givePointsToTeam = (team) => {
  gameState.value[team].score += currentRound.value.points;
  currentRound.value.points = 0; // Reset round points after giving them to the team
};

const toggleShowQuestion = () => {
  gameState.value.showQuestion = !gameState.value.showQuestion;
};

const saveGameState = async () => {
  try {
    await axios.post(window.location.origin + '/api/game', gameState.value);
  } catch (error) {
    console.error('Error saving game state:', error);
    alert('Failed to save game state.');
  }
};

const exportGameState = () => {
  const dataStr = JSON.stringify(gameState.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const exportFileDefaultName = 'gameState.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

const importGameState = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedGameState = JSON.parse(e.target.result);
        validateGameState(importedGameState);
        gameState.value = importedGameState;
        errorMessage.value = '';
      } catch (error) {
        errorMessage.value = `Error importing game state: ${error.message}`;
      }
    };
    reader.readAsText(file);
  }
};

const validateGameState = (state) => {
  if (!state.rounds || !Array.isArray(state.rounds)) {
    throw new Error('Invalid game state: missing or invalid rounds array');
  }
  if (!state.team1 || typeof state.team1.name !== 'string' || typeof state.team1.score !== 'number') {
    throw new Error('Invalid game state: missing or invalid team1');
  }
  if (!state.team2 || typeof state.team2.name !== 'string' || typeof state.team2.score !== 'number') {
    throw new Error('Invalid game state: missing or invalid team2');
  }
  if (typeof state.currentRound !== 'number') {
    throw new Error('Invalid game state: missing or invalid currentRound');
  }
  if (typeof state.showQuestion !== 'boolean') {
    throw new Error('Invalid game state: missing or invalid showQuestion');
  }
  for (const round of state.rounds) {
    if (typeof round.question !== 'string' || typeof round.points !== 'number' || typeof round.strikes !== 'number') {
      throw new Error('Invalid game state: invalid round properties');
    }
    if (!round.answers || !Array.isArray(round.answers)) {
      throw new Error('Invalid game state: missing or invalid answers array');
    }
    for (const answer of round.answers) {
      if (typeof answer.text !== 'string' || typeof answer.points !== 'number' || typeof answer.revealed !== 'boolean') {
        throw new Error('Invalid game state: invalid answer properties');
      }
    }
  }
};
</script>

<style scoped>
.game-state-editor {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
input {
  margin: 0.5em;
}
button {
  margin: 0.5em;
}
.error-message {
  color: red;
  font-weight: bold;
}
</style>
