/// <reference types="jest" />
/**
 * @jest-environment node
 */
import { start } from '../../source/app';


test('simple app run', () => {
    start()
})