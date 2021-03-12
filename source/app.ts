import { loadCustomConfiguration } from './config'
import { CpuMonitor } from './monitors/cpu-monitor'
const config = loadCustomConfiguration()
const monitors: any[] = [];

function loadMonitors() {
    const monitorFilenames = config.monitorFilenames;

    for (let i = 0; i < monitorFilenames.length; i++) {
        const monitorFilename = monitorFilenames[i];
        if (monitorFilename === 'cpu-monitor') {
            try {
                const monitor = new CpuMonitor()
                monitors.push(monitor);
            } catch (err) {
                console.error(`Could not load monitor ${monitorFilename}`, err.stack || err);
            }
        }
    }

    console.log(`${monitors.length} monitors loaded.`);
}

function collectStatistics() {
    for (let i = 0; i < monitors.length; i++) {
        const monitor = monitors[i];

        console.log(`Collecting statistics (${monitor.name} monitor)...`);
        monitor.collect();
        console.log(`Collected statistics (${monitor.name} monitor)...`);
    }
}

function sendStatistics() {
    for (let i = 0; i < monitors.length; i++) {
        const monitor = monitors[i];

        console.log(`Sending statistics (${monitor.name} monitor)...`);
        monitor.sendStatistics();
        console.log(`Sent statistics (${monitor.name} monitor).`);

        monitor.clearStatistics();
    }
}

export function start() {
    loadMonitors();

    console.log('Start collecting statistics...');
    collectStatistics();
    setInterval(collectStatistics, config.collectStatisticsInterval);

    console.log('Start sending statistics...');
    setInterval(sendStatistics, config.sendStatisticsInterval);
}

start();