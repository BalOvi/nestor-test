import { Router } from 'express';
import * as groupController from '../controllers/groupController';

const groupRoutes = Router();

groupRoutes.post('/group', groupController.createGroup);
groupRoutes.put('/group/:id', groupController.updateGroup);
groupRoutes.get('/groups', groupController.getGroups);
groupRoutes.post('/group/movePerson', groupController.movePersonToGroup);
groupRoutes.post('/group/moveGroup', groupController.moveGroupToGroup);

export default groupRoutes;