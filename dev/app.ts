import {getInjectorManager, InjectableProvider, Provider} from "brit";
import {CoreModuleConfig} from "@jchpro/web-app-core";
import {Root} from "./root";
import {MongooseModuleConfig} from "../src";

@InjectableProvider(CoreModuleConfig)
export class CoreModuleConfigProvider implements Provider<CoreModuleConfig> {
  provide(): CoreModuleConfig {
    const config = new CoreModuleConfig();
    config.name = 'Mongoose Module Development';
    config.port = 4001;
    return config;
  }

}

@InjectableProvider(MongooseModuleConfig)
export class MongooseModuleConfigProvider implements Provider<MongooseModuleConfig> {
  provide(): MongooseModuleConfig {
    const config = new MongooseModuleConfig();
    config.dbName = 'dev-database';
    return config;
  }
}

getInjectorManager()
  .getInjector()
  .injectFor<Root>(Root)
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
