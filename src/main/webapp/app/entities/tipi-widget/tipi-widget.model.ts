import { BaseEntity } from './../../shared';

export class TipiWidget implements BaseEntity {
    constructor(
        public id?: number,
        public dbTipo?: string,
        public dbTipoCont?: string,
        public flDrill?: boolean,
        public widgetImpl?: BaseEntity,
    ) {
        this.flDrill = false;
    }
}
