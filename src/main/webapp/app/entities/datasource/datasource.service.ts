import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Datasource } from './datasource.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DatasourceService {

    private resourceUrl =  SERVER_API_URL + 'api/datasources';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(datasource: Datasource): Observable<Datasource> {
        const copy = this.convert(datasource);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(datasource: Datasource): Observable<Datasource> {
        const copy = this.convert(datasource);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Datasource> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Datasource.
     */
    private convertItemFromServer(json: any): Datasource {
        const entity: Datasource = Object.assign(new Datasource(), json);
        entity.tsCreaz = this.dateUtils
            .convertLocalDateFromServer(json.tsCreaz);
        entity.tsModif = this.dateUtils
            .convertLocalDateFromServer(json.tsModif);
        return entity;
    }

    /**
     * Convert a Datasource to a JSON which can be sent to the server.
     */
    private convert(datasource: Datasource): Datasource {
        const copy: Datasource = Object.assign({}, datasource);
        copy.tsCreaz = this.dateUtils
            .convertLocalDateToServer(datasource.tsCreaz);
        copy.tsModif = this.dateUtils
            .convertLocalDateToServer(datasource.tsModif);
        return copy;
    }
}
