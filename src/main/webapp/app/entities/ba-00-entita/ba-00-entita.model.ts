import { BaseEntity } from './../../shared';

export class Ba00Entita implements BaseEntity {
    constructor(
        public id?: number,
        public nmNome?: string,
        public cdCod?: string,
    ) {
    }
}
