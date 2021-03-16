import { Monitor } from './entities/monitor'
import {disksIO} from 'systeminformation'

export class DiskMonitor extends Monitor {
    constructor() {
        super('disk');
    }

    async collect(): Promise<void> {
        const diskStatisticsList: string | any[] = []
        const data = await disksIO()
        try {
            this.setStatistics([
                ['all', data],
            ])
        }
        catch (e) {
            console.error('Memory info cannot be read', e.stack || e)
        }
        // usageRead({ device: deviceName }, function (bytesPerSecond: any){
        //     diskStatisticsList.push(`${deviceName}`, bytesPerSecond)
        // })

        const allStatistics: any[] = [];
        for (let i = 0; i < diskStatisticsList.length; i++) {
            const diskStatistics = diskStatisticsList[i];
            Array.prototype.push.apply(allStatistics, diskStatistics);
        }
        this.setStatistics (allStatistics)
    }
}