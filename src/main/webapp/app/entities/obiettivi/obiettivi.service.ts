import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Obiettivi } from './obiettivi.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ObiettiviService {

    private resourceUrl =  SERVER_API_URL + 'api/obiettivis';

    constructor(private http: Http) { }

    create(obiettivi: Obiettivi): Observable<Obiettivi> {
        const copy = this.convert(obiettivi);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(obiettivi: Obiettivi): Observable<Obiettivi> {
        const copy = this.convert(obiettivi);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Obiettivi> {
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
     * Convert a returned JSON object to Obiettivi.
     */
    private convertItemFromServer(json: any): Obiettivi {
        const entity: Obiettivi = Object.assign(new Obiettivi(), json);
        return entity;
    }

    /**
     * Convert a Obiettivi to a JSON which can be sent to the server.
     */
    private convert(obiettivi: Obiettivi): Obiettivi {
        const copy: Obiettivi = Object.assign({}, obiettivi);
        return copy;
    }
}
