<template>
  <div class="app">
    <div class="wrapper">
      <div class="game-board">
        <a href="/control" class="score">Control a Game</a>
        <a href="/game" class="score">Play a Game</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
</script>

<style scoped>
:root {
  font-size: 16px; /* Base font size for rem units */
}

html,
body {
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

.game-board {
  width: 60%; /* Percentage-based width */
  height: auto; /* Viewport height-based height */
  padding: 1.25rem; /* 20px equivalent */
  border-radius: 0.625rem; /* 10px equivalent */
  background-color: #2c3e50;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.5); /* 10px equivalent */
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 0.3125rem solid gold; /* 5px equivalent */
  gap: 1rem; /* Spacing between the buttons */
}

.score {
  font-size: 3rem;
  text-align: center;
  background-color: #08aafa;
  padding: 0.625rem; /* 10px equivalent */
  border-radius: 0.3125rem; /* 5px equivalent */
  display: inline-block;
  color: white;
  text-decoration: none;
}
</style>
