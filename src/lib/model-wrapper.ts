const mongoose = require('mongoose');
import {Document, DocumentQuery, Model, Schema, SchemaDefinition, SchemaTimestampsConfig} from "mongoose";
import * as _ from 'lodash';

export class ModelWrapper<TDocument extends Document & TDataShape = any, TDataShape extends object = any> {

  private _model: Model<TDocument> | undefined;

  name: string = 'unnamed-model';
  schemaDefinition: SchemaDefinition = {};
  optionsToMerge?: ModelWrapper.Options;
  schemaModifier?: ModelWrapper.SchemaModifier;

  get model(): Model<TDocument> {
    if (!this._model) {
      const options = _.merge({}, ModelWrapper.DEFAULT_OPTIONS, this.optionsToMerge || {});
      const schema = new mongoose.Schema(this.schemaDefinition, options);
      if (typeof this.schemaModifier === 'function') {
        this.schemaModifier(schema, options);
      }
      this._model = mongoose.model(this.name, schema);
    }
    return this._model as Model<TDocument>;
  }

  // CRUD

  createOne(stub: TDataShape): Promise<TDocument> {
    const doc = new this.model(stub);
    return doc.save();
  }

  // TODO create many ?

  readOne(idOrDoc: string | TDocument): Promise<TDocument | null> {
    const query = this.model.findById(idOrDoc);
    return query.exec();
  }

  readMany(
    conditions?: any,
    queryModifier?: ModelWrapper.QueryModifier<TDocument[], TDocument>
  ): Promise<TDocument[]> {
    const query = this.model.find(conditions);
    if (typeof queryModifier === 'function') {
      queryModifier(query);
    }
    return query.exec();
  }

  readAll(queryModifier?: ModelWrapper.QueryModifier<TDocument[], TDocument>): Promise<TDocument[]> {
    return this.readMany({}, queryModifier);
  }

  // TODO rethink options
  updateOne(idOrDoc: string | TDocument, data: any): Promise<TDocument | null> {
    const query = this.model.findOneAndUpdate(idOrDoc, data, {new: true});
    return query.exec();
  }

  // TODO update many

  deleteOne(doc: TDocument): Promise<TDocument>;
  deleteOne(id: string): Promise<TDocument | null>;
  deleteOne(idOrDoc: string | TDocument): Promise<TDocument> | Promise<TDocument | null> {
    if (typeof idOrDoc === 'string') {
      return this.model.findByIdAndRemove(idOrDoc).exec();
    }
    return idOrDoc.remove();
  }

  // TODO delete many
}

export namespace ModelWrapper {

  export interface Options {
    timestamps?: boolean | SchemaTimestampsConfig;
  }

  export type SchemaModifier = (schema: Schema, mergedOptions: Options) => void;

  export type QueryModifier<TReturn = any, TDocument extends Document = any>
    = (query: DocumentQuery<TReturn, TDocument>) => void;

  export const DEFAULT_OPTIONS: Options = {
    timestamps: {
      updatedAt: 'updated',
      createdAt: 'created'
    }
  };

}
