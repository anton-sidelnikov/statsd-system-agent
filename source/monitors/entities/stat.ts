import debug from 'debug'
import { snakeCase } from 'change-case'
import { statsdClient } from '../../utils/statsd-client';

const debugSt = debug('statsd-agent:statistic')

export class Statistic {
    private statsdName: string;
    private value: never;

    constructor(statsdName: string, value: never) {
        this.statsdName = statsdName.split('.').map((s: string) => snakeCase(s)).join('.');
        this.value = value;
    }

    send() {
        debugSt('Sending statistic %s = %d', this.statsdName, this.value);

        statsdClient.gauge(this.statsdName, this.value);
    }
}