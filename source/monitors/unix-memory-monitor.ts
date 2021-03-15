import { Monitor } from './entities/monitor'
import { mem } from 'systeminformation'

export class MemoryMonitor extends Monitor {
    constructor() {
        super('memory');
    }

    collect() {
        let freeMem, totalMem, usedMem
        mem().then(data => {
            freeMem = data.free
            totalMem = data.total
            usedMem = data.used
        }).catch(error => console.error('Memory info cannot be read', error.stack || error))

        this.setStatistics([
            ['free', freeMem],
            ['total', totalMem],
            ['used', usedMem],
        ])
    }
}
