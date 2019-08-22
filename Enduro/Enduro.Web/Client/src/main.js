import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';
import * as $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });
var winObj = window;
winObj['jQuery'] = $;
winObj['$'] = $;
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-dialog'))
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .feature(PLATFORM.moduleName('resources/index'));
    // Uncomment the line below to enable animation.
    // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
    // if the css animator is enabled, add swap-order="after" to all router-view elements
    // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    return aurelia.start().then(function () { return aurelia.setRoot(PLATFORM.moduleName('app')); });
}
//# sourceMappingURL=main.js.map