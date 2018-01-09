import { BaseEntity } from './../../shared';

export class IndicValIn implements BaseEntity {
    constructor(
        public id?: number,
        public ndValInf?: number,
        public ndValSup?: number,
        public obi01ObiettiviIndic?: BaseEntity,
    ) {
    }
}
