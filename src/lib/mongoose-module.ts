import {Injectable} from "brit";
import {MongooseModuleConfig} from "./mongoose-module-config";
import {Mongoose} from "mongoose";
import {CoreModule} from "@jchpro/web-app-core";

const mongoose = require('mongoose');

@Injectable({async: true})
export class MongooseModule {

  mongoose: Mongoose = mongoose;

  constructor(
    private readonly _core: CoreModule,
    readonly config: MongooseModuleConfig
  ) {
    this._connectToMongoDB();
  }

  private _connectToMongoDB() {
    this.mongoose.connect(
      this.config.mongoDBUri,
      {useNewUrlParser: true},
      (err: Error) => {
        if (err) {
          throw new Error(`Mongoose connection error`);
        }
        this._core.log.info(
          `Mongoose connected to MongoDB: ${this.config.dbName}`
        );
        Injectable.markAsReady(MongooseModule);
      }
    )
  }
}
