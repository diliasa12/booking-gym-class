import {
  create,
  deleteOneClass,
  getClasses,
  getOneClass,
  updateOneClass,
} from "../services/classService.js";
import catchAsync from "../utils/catchAsync.js";

export const createClass = catchAsync(async (req, res) => {
  const { title } = req.body;
  const { body } = req;
  const result = await create(title, body);
  res.status(201).json(result);
});

export const getClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getOneClass(id);
  res.status(200).json(result);
});
export const getAllClass = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const result = await getClasses(page, limit);
  res.status(200).json(result);
});

export const updateClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await updateOneClass(id, body.title, body);
  res.status(200).json(result);
});

export const deleteClass = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await deleteOneClass(id);
  res.status(200).json(result);
});
