const errorHandler = async (err, req, res, next) => {
  res.status(400).json({ message: err.message });
};

export default errorHandler;
