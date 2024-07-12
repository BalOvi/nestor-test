import { Request, Response } from 'express';
import * as groupService from '../services/groupService';

export const createGroup = async (req: Request, res: Response) => {
  try {
    const parentGroupId = req.body.parentGroupId === '' ? null : req.body.parentGroupId;
    const result = await groupService.createGroup({ ...req.body, parentGroupId });
    res.status(201).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const parentGroupId = req.body.parentGroupId === '' ? null : req.body.parentGroupId;
    const result = await groupService.updateGroup(Number(req.params.id), { ...req.body, parentGroupId });
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const result = await groupService.getGroups();
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getGroupsFullDetails = async (req: Request, res: Response) => {
  try {
    const result = await groupService.getGroupsDetails();
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const movePersonToGroup = async (req: Request, res: Response) => {
  try {
    const { groupId, personId } = req.body;
    const result = await groupService.movePersonToGroup(groupId, personId);
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const moveGroupToGroup = async (req: Request, res: Response) => {
  try {
    const { groupId, parentGroupId } = req.body;
    const result = await groupService.moveGroupToGroup(groupId, parentGroupId === '' ? null : parentGroupId);
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};