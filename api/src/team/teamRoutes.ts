import { Router } from 'express';
import teamController from './teamController';

const router: Router = Router();

router.post('/', teamController.createTeam);
router.put('/:teamId', teamController.updateTeam);
router.delete('/:teamId', teamController.deleteTeam);
router.get('/:teamId', teamController.getTeam);

export default router;
