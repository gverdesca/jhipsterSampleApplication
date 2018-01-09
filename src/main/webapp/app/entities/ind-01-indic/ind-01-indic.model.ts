import { BaseEntity } from './../../shared';

export class Ind01Indic implements BaseEntity {
    constructor(
        public id?: number,
        public dlDes?: string,
        public ltNote?: string,
        public dlPathOwl?: string,
        public dlIri?: string,
        public dbCod?: string,
        public ind02Std?: BaseEntity,
        public ind04classif?: BaseEntity,
    ) {
    }
}
