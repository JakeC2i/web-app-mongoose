import {Injectable} from "brit";
import {CoreModule} from "@jchpro/web-app-core";
import {Resource} from "./resource";

@Injectable()
export class Root {

  constructor(
    private _core: CoreModule,
    private _resourceModel: Resource
  ) {
    this._core.log.info(`Mongoose model "${this._resourceModel.model.modelName}" is ready`);
    this._core.runServer();
  }

}
