import { BaseEntity } from './../../shared';

export class Ba01Utente implements BaseEntity {
    constructor(
        public id?: number,
        public nmNome?: string,
        public cdCod?: string,
        public userEntity?: BaseEntity,
    ) {
    }
}
