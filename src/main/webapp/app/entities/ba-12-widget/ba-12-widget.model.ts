import { BaseEntity } from './../../shared';

export class Ba12Widget implements BaseEntity {
    constructor(
        public id?: number,
        public deOptions?: string,
        public dbTitolo?: string,
        public deContent?: string,
        public ba11Dsh?: BaseEntity,
        public dashboard?: BaseEntity,
        public query?: BaseEntity,
        public widgetType?: BaseEntity,
        public ind12Query?: BaseEntity,
    ) {
    }
}
