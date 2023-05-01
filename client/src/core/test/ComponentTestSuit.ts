import { TestSuit } from 'good-lib/test-lib/TestSuit';
import { axios } from '../../lib/axios';

export abstract class ComponentTestSuit extends TestSuit {
    constructor() {
        super(axios);
    }
}
