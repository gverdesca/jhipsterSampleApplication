import { BaseEntity } from './../../shared';

export class Obi02IndicValu implements BaseEntity {
    constructor(
        public id?: number,
        public tivalu?: number,
        public ndvalinf?: number,
        public ndvalsup?: number,
    ) {
    }
}
