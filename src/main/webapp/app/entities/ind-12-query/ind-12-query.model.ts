import { BaseEntity } from './../../shared';

export class Ind12Query implements BaseEntity {
    constructor(
        public id?: number,
        public dbTipo?: string,
        public cdCod?: string,
        public nmNome?: string,
        public deQuery?: string,
        public dlPath?: string,
        public deDesc?: string,
        public datasource?: BaseEntity,
        public widgets?: BaseEntity[],
    ) {
    }
}
