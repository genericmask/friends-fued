import { Router } from 'express';
import roundController from './roundController';

const router: Router = Router();

router.post('/', roundController.createRound);
router.put('/:roundId', roundController.updateRound);
router.delete('/:roundId', roundController.deleteRound);
router.get('/:roundId', roundController.getRound);

export default router;
