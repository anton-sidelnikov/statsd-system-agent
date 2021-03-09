export interface ConfigDefault {
    monitorFilenames: string[]
    collectStatisticsInterval: number
    sendStatisticsInterval: number
    statsdConfig: StatsdConfig
}

interface StatsdConfig {
    prefix: string
    host: string
    debug: boolean
}

export function createDefaultConfig(): ConfigDefault {
    return {
        monitorFilenames: ['cpu-monitor', 'default-memory-monitor', 'disk-monitor', 'network-monitor'],
        collectStatisticsInterval: 10*1000,
        sendStatisticsInterval: 10*1000,
        statsdConfig: {
            prefix: 'system',
            host: 'localhost',
            debug: false
        }
    }
}