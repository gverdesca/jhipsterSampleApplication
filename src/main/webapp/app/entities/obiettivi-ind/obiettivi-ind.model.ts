import { BaseEntity } from './../../shared';

export class ObiettiviInd implements BaseEntity {
    constructor(
        public id?: number,
        public dtIni?: any,
        public dtFine?: any,
        public tiSegno?: string,
        public ind01Indic?: BaseEntity,
        public ind12Query?: BaseEntity,
        public obi00obiettivo?: BaseEntity,
        public obi02IndicValuses?: BaseEntity[],
        public obi03IndicValuInters?: BaseEntity[],
    ) {
    }
}
