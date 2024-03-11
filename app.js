import http from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import chalk from "chalk";

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, "public")));

const io = new SocketIOServer(server);

io.on("connection", (socket) => {
  console.log(chalk.cyan("==> socket is connected"));

  setTimeout(() => {
    socket.emit("server message", "This is a message from the server");
  }, 2000);

  socket.on("disconnect", () => {
    console.log(chalk.red("==> socket is disconnect"));
  });

  socket.on("chat message", (msg) => {
    console.log("node js message: " + msg);
    io.emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 8010;
server.listen(PORT, () => {
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Chat app listening on port",
      chalk.bgHex("#FFA500").hex("#000")(`${PORT}!`)
    )
  );
});

/*
import express, { json, urlencoded, static as static_ } from "express";
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
app.use(static_("./public"));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html");
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
*/
