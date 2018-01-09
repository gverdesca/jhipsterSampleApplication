import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ba00Entita } from './ba-00-entita.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ba00EntitaService {

    private resourceUrl =  SERVER_API_URL + 'api/ba-00-entitas';

    constructor(private http: Http) { }

    create(ba00Entita: Ba00Entita): Observable<Ba00Entita> {
        const copy = this.convert(ba00Entita);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ba00Entita: Ba00Entita): Observable<Ba00Entita> {
        const copy = this.convert(ba00Entita);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ba00Entita> {
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
     * Convert a returned JSON object to Ba00Entita.
     */
    private convertItemFromServer(json: any): Ba00Entita {
        const entity: Ba00Entita = Object.assign(new Ba00Entita(), json);
        return entity;
    }

    /**
     * Convert a Ba00Entita to a JSON which can be sent to the server.
     */
    private convert(ba00Entita: Ba00Entita): Ba00Entita {
        const copy: Ba00Entita = Object.assign({}, ba00Entita);
        return copy;
    }
}
