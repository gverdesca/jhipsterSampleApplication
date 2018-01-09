import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ind12Query } from './ind-12-query.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ind12QueryService {

    private resourceUrl =  SERVER_API_URL + 'api/ind-12-queries';

    constructor(private http: Http) { }

    create(ind12Query: Ind12Query): Observable<Ind12Query> {
        const copy = this.convert(ind12Query);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ind12Query: Ind12Query): Observable<Ind12Query> {
        const copy = this.convert(ind12Query);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ind12Query> {
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
     * Convert a returned JSON object to Ind12Query.
     */
    private convertItemFromServer(json: any): Ind12Query {
        const entity: Ind12Query = Object.assign(new Ind12Query(), json);
        return entity;
    }

    /**
     * Convert a Ind12Query to a JSON which can be sent to the server.
     */
    private convert(ind12Query: Ind12Query): Ind12Query {
        const copy: Ind12Query = Object.assign({}, ind12Query);
        return copy;
    }
}
