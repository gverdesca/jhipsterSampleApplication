import { BaseEntity } from './../../shared';

export class Ind02Std implements BaseEntity {
    constructor(
        public id?: number,
        public dlDes?: string,
        public dlUrl?: string,
        public dbCod?: string,
    ) {
    }
}
