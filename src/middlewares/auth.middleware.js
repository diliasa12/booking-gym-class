import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import catchAsync from "../utils/catchAsync.js";

export const authorization = catchAsync(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Access forbidden");
    err.statusCode = 403;
    throw err;
  }
  token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decode.id)
    .select("-password")
    .populate("joinedClasses")
    .lean();
  if (!req.user) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  next();
});
