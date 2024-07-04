import { Router } from 'express';
import gameController from './gameController';

const router: Router = Router();

router.get('/', gameController.getGameState);
router.post('/', gameController.saveGameState);

export default router;
