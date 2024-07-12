import { Router } from 'express';
import * as personController from '../controllers/personController';

const personRoutes = Router();

personRoutes.post('/person', personController.createPerson);
personRoutes.put('/person/:id', personController.updatePerson);
personRoutes.get('/people', personController.getPeople);

export default personRoutes;
