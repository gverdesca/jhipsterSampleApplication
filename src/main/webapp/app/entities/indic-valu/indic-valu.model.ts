import { BaseEntity } from './../../shared';

export class IndicValu implements BaseEntity {
    constructor(
        public id?: number,
        public tiValu?: number,
        public ndalInf?: number,
        public ndValSup?: number,
        public obi01ObiettiviIndic?: BaseEntity,
    ) {
    }
}
