import { copySync, existsSync } from 'fs-extra'


export function loadCustomConfiguration(): string {
    let customConfig
    if (existsSync(__dirname + '/config.custom.js')) {
        console.log('Loading custom configuration...');

        customConfig = require('./config.custom');
    } else {
        console.log('Creating custom configuration file...');

        copySync(__dirname + '/config.default.js', __dirname + '/config.custom.js');

        loadCustomConfiguration();
    }
    return customConfig
}
