import { BaseEntity } from './../../shared';

export class Ba10Menu implements BaseEntity {
    constructor(
        public id?: number,
        public nmNome?: string,
        public cdCod?: string,
        public dbOrdine?: string,
        public dlPath?: string,
        public dlIcon?: string,
        public blLink?: boolean,
        public ba10Menu?: BaseEntity,
        public childs?: BaseEntity[],
        public menuParent?: BaseEntity,
    ) {
        this.blLink = false;
    }
}
