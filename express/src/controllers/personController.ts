import { Request, Response } from 'express';
import * as personService from '../services/personService';

export const createPerson = async (req: Request, res: Response) => {
  try {
    const result = await personService.createPerson(req.body);
    res.status(201).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const result = await personService.updatePerson(Number(req.params.id), req.body);
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getPeople = async (req: Request, res: Response) => {
  try {
    const result = await personService.getPeople();
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
