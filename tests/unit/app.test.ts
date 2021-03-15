/// <reference types="jest" />
/**
 * @jest-environment node
 */
import { Statistic } from '../../source/monitors/entities/stat';
import WS from 'jest-websocket-mock';

const server = new WS('ws://localhost:8125');

afterAll(() => {
    server.close()
})

test('simple app run', () => {
    const testStat = new Statistic ('cpu.user','2.96')
    const resp = testStat.send()
    expect(resp).toEqual(true)
})