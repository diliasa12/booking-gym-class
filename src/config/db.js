import mongoose from "mongoose";
const mongoseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected");
    })
    .catch(() => {
      console.log("Failed");
    });
};

export default mongoseConnect;
