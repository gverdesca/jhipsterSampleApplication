import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ba11Dsh } from './ba-11-dsh.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ba11DshService {

    private resourceUrl =  SERVER_API_URL + 'api/ba-11-dshes';

    constructor(private http: Http) { }

    create(ba11Dsh: Ba11Dsh): Observable<Ba11Dsh> {
        const copy = this.convert(ba11Dsh);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ba11Dsh: Ba11Dsh): Observable<Ba11Dsh> {
        const copy = this.convert(ba11Dsh);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ba11Dsh> {
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
     * Convert a returned JSON object to Ba11Dsh.
     */
    private convertItemFromServer(json: any): Ba11Dsh {
        const entity: Ba11Dsh = Object.assign(new Ba11Dsh(), json);
        return entity;
    }

    /**
     * Convert a Ba11Dsh to a JSON which can be sent to the server.
     */
    private convert(ba11Dsh: Ba11Dsh): Ba11Dsh {
        const copy: Ba11Dsh = Object.assign({}, ba11Dsh);
        return copy;
    }
}
