import { BaseEntity } from './../../shared';

export class Datasource implements BaseEntity {
    constructor(
        public id?: number,
        public dbTipo?: string,
        public cdCod?: string,
        public tsCreaz?: any,
        public tsModif?: any,
        public dlPathImg?: string,
        public queries?: BaseEntity[],
        public user?: BaseEntity,
        public userUpdate?: BaseEntity,
    ) {
    }
}
