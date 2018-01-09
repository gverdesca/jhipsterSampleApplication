import { BaseEntity } from './../../shared';

export class Ind04Classif implements BaseEntity {
    constructor(
        public id?: number,
        public dlDes?: string,
        public dbCod?: string,
    ) {
    }
}
