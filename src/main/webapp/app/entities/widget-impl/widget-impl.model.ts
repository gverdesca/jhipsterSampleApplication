import { BaseEntity } from './../../shared';

export class WidgetImpl implements BaseEntity {
    constructor(
        public id?: number,
        public dbTipo?: string,
    ) {
    }
}
