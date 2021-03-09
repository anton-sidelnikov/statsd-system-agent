import { existsSync, writeFileSync, readFileSync } from 'fs-extra'
import { ConfigDefault, createDefaultConfig } from './config.default'

export function loadCustomConfiguration(): ConfigDefault {
    let customConfig
    if (existsSync(__dirname + '/config.custom')) {
        console.log('Loading configuration...')

        customConfig = readFileSync(__dirname +'/config.custom', 'utf8')
        customConfig = JSON.parse(customConfig)
    } else {
        console.log('Creating default configuration file...')
        const config = createDefaultConfig()
        writeFileSync(__dirname +'/config.custom', JSON.stringify(config) , 'utf-8')

        loadCustomConfiguration()
    }
    return customConfig
}
