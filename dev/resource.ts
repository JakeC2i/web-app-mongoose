import {Injectable} from "brit";
import {ModelWrapper} from "../src";
import {Document} from "mongoose";

export interface ResourceData {

  name: string;
  value: number;

  created: Date;
  updated: Date;

}

export interface ResourceDocument extends Document, ResourceData {}

@Injectable()
export class Resource extends ModelWrapper<ResourceDocument, ResourceData> {

  name = 'resource';
  schemaDefinition = {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  };



}
