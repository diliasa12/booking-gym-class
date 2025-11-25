import catchAsync from "../utils/catchAsync.js";
import { hapusClass, tambahClass } from "../services/userService.js";
export const getProfile = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export const getClasses = catchAsync(async (req, res) => {
  res.status(202).json({
    succes: true,
    class: req.user.joinedClasses,
  });
});

export const addClass = catchAsync(async (req, res) => {
  const { classId } = req.params;
  const userId = req.user._id;
  const result = await tambahClass(classId, userId);
  res.status(201).json(result);
});

export const deleteClass = catchAsync(async (req, res) => {
  const { classId } = req.params;
  const userEmail = req.user.email;
  const result = await hapusClass(classId, userEmail);
  res.status(200).json(result);
});
