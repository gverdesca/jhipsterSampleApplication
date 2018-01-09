import { BaseEntity } from './../../shared';

export class Ba11Dsh implements BaseEntity {
    constructor(
        public id?: number,
        public dbTitolo?: string,
        public deDesc?: string,
        public deContent?: string,
        public widgets?: BaseEntity[],
        public user?: BaseEntity,
        public menu?: BaseEntity,
    ) {
    }
}
