import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Controller from "utils/interfaces/controller.interface";

import errorMiddleware from "./middlware/error.middleware";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    //trigger methods
    this.intializeMiddlewares();
    this.intializeMongoose();
    this.intializeControllers(controllers);
    this.initializeErrorHandling();
  }

  //intialize routes
  private intializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api/v1", controller.router);
    });
  }

  //initialize middlewares
  private intializeMiddlewares(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(morgan("dev"));
  }
  //initialize mongoose
  private intializeMongoose(): void {
    let url = process.env.DATABASE?.replace(
      "<PASSWORD>",
      String(process.env.PASSWORD)
    );

    if (url) {
      mongoose
        .connect(url)
        .then(() => console.log("Connected To Database"))
        .catch((er) => console.log("Something went very wrong" + er));
    }
  }

  private initializeErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  //listen to server
  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default App;
