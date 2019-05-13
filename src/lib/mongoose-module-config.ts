import {Injectable} from "brit";

@Injectable()
export class MongooseModuleConfig {

  host: string = 'localhost';
  dbName: string = '';

  auth?: {
    user: string;
    password: string;
  };

  get mongoDBUri(): string {
    if (!this.dbName) {
      throw new Error('Database name can not be empty!');
    }
    const auth = this.auth;
    return `mongodb://${auth ? `${auth.user}:${auth.password}@` : ''}${this.host}/${this.dbName}`;
  }
}
