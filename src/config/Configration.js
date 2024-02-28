import { connect } from "mongoose";
import chalk from "chalk";

export const Dbcon = async () => {
  try {
    const conn = await connect(process.env.MONGO_URL);
    console.log(chalk.green.italic`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log();
    console.log(chalk.red.italic`MongoDB connection error: ${error}`);
  }
};
