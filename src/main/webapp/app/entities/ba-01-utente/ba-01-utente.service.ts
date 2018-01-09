import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ba01Utente } from './ba-01-utente.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ba01UtenteService {

    private resourceUrl =  SERVER_API_URL + 'api/ba-01-utentes';

    constructor(private http: Http) { }

    create(ba01Utente: Ba01Utente): Observable<Ba01Utente> {
        const copy = this.convert(ba01Utente);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ba01Utente: Ba01Utente): Observable<Ba01Utente> {
        const copy = this.convert(ba01Utente);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ba01Utente> {
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
     * Convert a returned JSON object to Ba01Utente.
     */
    private convertItemFromServer(json: any): Ba01Utente {
        const entity: Ba01Utente = Object.assign(new Ba01Utente(), json);
        return entity;
    }

    /**
     * Convert a Ba01Utente to a JSON which can be sent to the server.
     */
    private convert(ba01Utente: Ba01Utente): Ba01Utente {
        const copy: Ba01Utente = Object.assign({}, ba01Utente);
        return copy;
    }
}
