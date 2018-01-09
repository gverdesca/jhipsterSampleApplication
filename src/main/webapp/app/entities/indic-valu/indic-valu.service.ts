import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { IndicValu } from './indic-valu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IndicValuService {

    private resourceUrl =  SERVER_API_URL + 'api/indic-valus';

    constructor(private http: Http) { }

    create(indicValu: IndicValu): Observable<IndicValu> {
        const copy = this.convert(indicValu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(indicValu: IndicValu): Observable<IndicValu> {
        const copy = this.convert(indicValu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<IndicValu> {
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
     * Convert a returned JSON object to IndicValu.
     */
    private convertItemFromServer(json: any): IndicValu {
        const entity: IndicValu = Object.assign(new IndicValu(), json);
        return entity;
    }

    /**
     * Convert a IndicValu to a JSON which can be sent to the server.
     */
    private convert(indicValu: IndicValu): IndicValu {
        const copy: IndicValu = Object.assign({}, indicValu);
        return copy;
    }
}
