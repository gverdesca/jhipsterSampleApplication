import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { MondrianDs } from './mondrian-ds.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MondrianDsService {

    private resourceUrl =  SERVER_API_URL + 'api/mondrian-ds';

    constructor(private http: Http) { }

    create(mondrianDs: MondrianDs): Observable<MondrianDs> {
        const copy = this.convert(mondrianDs);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(mondrianDs: MondrianDs): Observable<MondrianDs> {
        const copy = this.convert(mondrianDs);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MondrianDs> {
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
     * Convert a returned JSON object to MondrianDs.
     */
    private convertItemFromServer(json: any): MondrianDs {
        const entity: MondrianDs = Object.assign(new MondrianDs(), json);
        return entity;
    }

    /**
     * Convert a MondrianDs to a JSON which can be sent to the server.
     */
    private convert(mondrianDs: MondrianDs): MondrianDs {
        const copy: MondrianDs = Object.assign({}, mondrianDs);
        return copy;
    }
}
