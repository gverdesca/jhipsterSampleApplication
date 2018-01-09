import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ba10Menu } from './ba-10-menu.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class Ba10MenuService {

    private resourceUrl =  SERVER_API_URL + 'api/ba-10-menus';

    constructor(private http: Http) { }

    create(ba10Menu: Ba10Menu): Observable<Ba10Menu> {
        const copy = this.convert(ba10Menu);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ba10Menu: Ba10Menu): Observable<Ba10Menu> {
        const copy = this.convert(ba10Menu);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ba10Menu> {
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
     * Convert a returned JSON object to Ba10Menu.
     */
    private convertItemFromServer(json: any): Ba10Menu {
        const entity: Ba10Menu = Object.assign(new Ba10Menu(), json);
        return entity;
    }

    /**
     * Convert a Ba10Menu to a JSON which can be sent to the server.
     */
    private convert(ba10Menu: Ba10Menu): Ba10Menu {
        const copy: Ba10Menu = Object.assign({}, ba10Menu);
        return copy;
    }
}
