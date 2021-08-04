const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");
const { DB_USER, DB_PASS, DB_NAME, PORT = 3000 } = process.env;
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qovnj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Listening at PORT ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
