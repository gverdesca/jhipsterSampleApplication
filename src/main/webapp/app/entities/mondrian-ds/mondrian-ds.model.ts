import { BaseEntity } from './../../shared';

export class MondrianDs implements BaseEntity {
    constructor(
        public id?: number,
        public nmCubo?: string,
        public dlNomeSaiku?: string,
        public dlPathSchema?: string,
        public deMondrianConn?: string,
        public dlJdbcUrl?: string,
        public dlDriver?: string,
        public dlUsername?: string,
        public dlPassword?: string,
        public datasource?: BaseEntity,
        public indicator?: BaseEntity,
    ) {
    }
}
