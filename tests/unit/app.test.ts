/// <reference types="jest" />
/**
 * @jest-environment node
 */
import { Statistic } from '../../source/monitors/entities/stat';
import WS from 'jest-websocket-mock';
import { CpuMonitor } from '../../source/monitors/cpu-monitor';
import { MemoryMonitor as UnMem } from '../../source/monitors/memory-monitor';

const server = new WS('ws://localhost:8125');

afterAll(() => {
    server.close()
})

test('statistic push', () => {
    const testStat = new Statistic ('cpu.user','2.96')
    const resp = testStat.send()
    expect(resp).toEqual(true)
})

test('cpu-monitor', () => {
    const monitor = new CpuMonitor()
    expect(monitor.name).toEqual('cpu')
    // set currentCpuTimes
    monitor.collect()
    expect(monitor.currentCpuTimes).toHaveProperty('user')
    expect(monitor.currentCpuTimes).toHaveProperty('idle')
    expect(monitor.currentCpuTimes).toHaveProperty('nice')
    expect(monitor.currentCpuTimes).toHaveProperty('sys')
    expect(monitor.currentCpuTimes).toHaveProperty('irq')
    // set statistics
    monitor.collect()
    monitor.clearStatistics()
    expect(monitor.statistics).toEqual([])
})

test('memory-monitor', async () => {
    const monitor = new UnMem()
    expect(monitor.name).toEqual('memory')
    // set statistics
    await monitor.collect()
    expect(monitor.statistics.length).toEqual(3)
    monitor.clearStatistics()
    expect(monitor.statistics).toEqual([])
})