import { BaseEntity } from './../../shared';

export class IndicValInt implements BaseEntity {
    constructor(
        public id?: number,
        public ndValInf?: number,
        public ndValSup?: number,
        public obi01ObiettiviIndic?: BaseEntity,
    ) {
    }
}
