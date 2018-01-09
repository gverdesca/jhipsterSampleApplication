import { BaseEntity } from './../../shared';

export class Obiettivi implements BaseEntity {
    constructor(
        public id?: number,
        public cdObi?: string,
        public dlObi?: string,
        public dlIcona?: string,
        public ba01utente?: BaseEntity,
        public obi01ObiettiviIndics?: BaseEntity[],
    ) {
    }
}
