import { loadCustomConfiguration } from '../../config';
import { Statistic } from './stat'
import debug from 'debug'
import _ from 'underscore'

const config = loadCustomConfiguration()

const debugMon = debug('statsd-agent:statistic')
let statisticBlackList: Set<string>

if (!_.isEmpty(config.statisticBlackList)) {
    statisticBlackList = new Set(config.statisticBlackList.map(statisticName => statisticName.toLowerCase()))
}

export class Monitor {
    private name: any;
    private statistics: any[]

    constructor(name: any) {
        this.name = name
        this.statistics = []
    }

    setStatistics(statisticsPairs: any[]) {
        debugMon('Setting statistics (%s)...', this.name, statisticsPairs)

        if (statisticBlackList) {
            statisticsPairs =
                statisticsPairs
                    .filter(statisticsPair => !statisticBlackList.has(`${this.name}.${statisticsPair[0]}`.toLowerCase()))
        }

        this.statistics =
            statisticsPairs
                .map(statisticsPair =>
                    new Statistic(`${this.name}.${statisticsPair[0]}`, statisticsPair[1]))
    }

    sendStatistics() {
        debug('Sending statistics...')

        const statistics = this.statistics

        for (let i = 0; i < statistics.length; i++) {
            const statistic = statistics[i]

            statistic.send()
        }
    }

    clearStatistics() {
        this.statistics = []
    }
}