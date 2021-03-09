/// <reference types="jest" />
/**
 * @jest-environment node
 */
import { loadCustomConfiguration } from '../../source/config';


test('simple config load', () => {
    const config = loadCustomConfiguration()
    expect(config).toEqual('')
})
