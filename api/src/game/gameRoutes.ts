import { Router } from 'express';
import gameController from './gameController';

const router: Router = Router();

// Route to create a new game
router.post('/', gameController.createGame);

// Route to reset a game
router.post('/reset/:gameId', gameController.resetGame);

// Route to get a game by ID
router.get('/:gameId', gameController.getGame);

// Route to update a game by ID
router.put('/:gameId', gameController.updateGame);

// Route to delete a game by ID
router.delete('/:gameId', gameController.deleteGame);

// Route to add a round to a game
router.post('/:gameId/rounds', gameController.addRoundToGame);

// Route to update the order of rounds in a game
router.put('/:gameId/rounds/order', gameController.updateRoundOrder);

// Route to modify team names
router.put('/:gameId/teams/:teamId/name', gameController.updateTeamName);

// Route to add or remove points from a team
router.put('/:gameId/teams/:teamId/score', gameController.updateTeamScore);

// Route to switch the currently active round
router.put('/:gameId/active-round', gameController.switchActiveRound);

// Route to retrieve past games
router.get('/past', gameController.getPastGames);

export default router;
