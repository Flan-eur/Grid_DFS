const express = require("express");
const cors = require("cors");
const controller = require('./controller/gridPath')

const app = express();
app.use(cors());
app.use(express.json());

app.post("/find-path", controller.gridPathFind)

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
