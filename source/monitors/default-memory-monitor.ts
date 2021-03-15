import { Monitor } from './entities/monitor'
import * as os from 'os'

export class MemoryMonitor extends Monitor {
    constructor() {
        super('memory');
    }

    collect(): void {
        const freemem = os.freemem();
        const totalmem = os.totalmem();

        this.setStatistics([
            ['free', freemem],
            ['total', totalmem],
            ['used', totalmem - freemem],
        ]);
    }
}