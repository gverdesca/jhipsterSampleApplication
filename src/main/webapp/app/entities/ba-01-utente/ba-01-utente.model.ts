import { BaseEntity } from './../../shared';

export class Ba01Utente implements BaseEntity {
    constructor(
        public id?: number,
        public nmnome?: string,
        public cdcod?: string,
    ) {
    }
}
