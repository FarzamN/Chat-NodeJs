import express, { json, urlencoded } from "express";
import { config } from "dotenv";
import { Dbcon } from "./src/config/Configration.js";
import chalk from "chalk";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8010;

config();
Dbcon();

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(chalk.cyan.bgCyanBright("socket is connected"));
});

app.listen(port, () =>
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Chat app listening on port",
      chalk.bgHex("#FFA500").hex("#000")(`${port}!`)
    )
  )
);
