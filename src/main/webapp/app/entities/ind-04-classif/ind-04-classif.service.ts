import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ind04Classif } from './ind-04-classif.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ind04ClassifService {

    private resourceUrl =  SERVER_API_URL + 'api/ind-04-classifs';

    constructor(private http: Http) { }

    create(ind04Classif: Ind04Classif): Observable<Ind04Classif> {
        const copy = this.convert(ind04Classif);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ind04Classif: Ind04Classif): Observable<Ind04Classif> {
        const copy = this.convert(ind04Classif);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ind04Classif> {
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
     * Convert a returned JSON object to Ind04Classif.
     */
    private convertItemFromServer(json: any): Ind04Classif {
        const entity: Ind04Classif = Object.assign(new Ind04Classif(), json);
        return entity;
    }

    /**
     * Convert a Ind04Classif to a JSON which can be sent to the server.
     */
    private convert(ind04Classif: Ind04Classif): Ind04Classif {
        const copy: Ind04Classif = Object.assign({}, ind04Classif);
        return copy;
    }
}
