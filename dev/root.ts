import {Injectable} from "brit";
import {CoreModule} from "@jchpro/web-app-core";
import {Resource} from "./resource";

@Injectable()
export class Root {

  constructor(
    private _core: CoreModule,
    private _resourceModel: Resource
  ) {
    console.log(this._resourceModel.model);
    this._core.runServer();
  }

}
