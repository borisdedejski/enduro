import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  //config.globalResources([]);
  config.globalResources([PLATFORM.moduleName('./elements/loading-indicator/loading-indicator')]);

}
