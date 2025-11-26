import User from "../models/user.model.js";
import Class from "../models/class.model.js";

export async function create(judul, body) {
  const existingClass = await Class.findOne({ title: judul });

  if (existingClass) {
    const err = new Error("Class already exist");
    err.statusCode = 409;
    throw err;
  }

  const classes = await Class.create(body);
  return {
    success: true,
    message: "Class successfully add",
    data: classes,
  };
}

export async function getOneClass(id) {
  const classes = await Class.findById(id).lean();
  if (!classes) {
    const err = new Error("Class not found");
    err.statusCode = 404;
    throw err;
  }
  return {
    success: true,
    data: classes,
  };
}

export async function getClasses(page, limit) {
  const startIndex = (page - 1) * limit;
  const classes = await Class.find().skip(startIndex).limit(limit).lean();
  return {
    success: true,
    page,
    limit,
    data: classes,
  };
}
export async function updateOneClass(id, title, body) {
  const existingClass = await Class.findOne({ title: title });
  if (existingClass) {
    const err = new Error("Class already exist");
    err.statusCode = 409;
    throw err;
  }
  const classes = await Class.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );
  return { success: true, data: classes };
}
export async function deleteOneClass(id) {
  const classes = await Class.findById(id);
  if (!classes) {
    const err = new Error("Class not found");
    err.statusCode = 404;
    throw err;
  }
  await User.updateMany(
    { joinedClasses: id },
    { $pull: { joinedClasses: id } }
  );
  await Class.deleteOne(classes);
  return {
    success: true,
    message: "Successfully delete class",
  };
}
