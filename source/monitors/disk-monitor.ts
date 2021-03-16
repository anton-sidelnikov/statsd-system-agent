import { Monitor } from './entities/monitor'
import { list } from 'drivelist'

export class DiskMonitor extends Monitor {
    constructor() {
        super('disk');
    }

    async collect(): Promise<void> {
        const drives = await list()
        for (const drv of drives){
            const deviceMountPath = drv.mountpoints && drv.mountpoints[0] && drv.mountpoints[0].path
            if (deviceMountPath == null)
                return
            this.setStatistics ([
                [`${deviceMountPath}.path`, deviceMountPath],
            ])
        }
    }
}