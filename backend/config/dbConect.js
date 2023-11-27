const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", true);

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;
