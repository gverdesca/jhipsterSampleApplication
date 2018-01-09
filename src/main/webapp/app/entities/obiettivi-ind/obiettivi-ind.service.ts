import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ObiettiviInd } from './obiettivi-ind.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ObiettiviIndService {

    private resourceUrl =  SERVER_API_URL + 'api/obiettivi-inds';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(obiettiviInd: ObiettiviInd): Observable<ObiettiviInd> {
        const copy = this.convert(obiettiviInd);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(obiettiviInd: ObiettiviInd): Observable<ObiettiviInd> {
        const copy = this.convert(obiettiviInd);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ObiettiviInd> {
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
     * Convert a returned JSON object to ObiettiviInd.
     */
    private convertItemFromServer(json: any): ObiettiviInd {
        const entity: ObiettiviInd = Object.assign(new ObiettiviInd(), json);
        entity.dtIni = this.dateUtils
            .convertLocalDateFromServer(json.dtIni);
        entity.dtFine = this.dateUtils
            .convertLocalDateFromServer(json.dtFine);
        return entity;
    }

    /**
     * Convert a ObiettiviInd to a JSON which can be sent to the server.
     */
    private convert(obiettiviInd: ObiettiviInd): ObiettiviInd {
        const copy: ObiettiviInd = Object.assign({}, obiettiviInd);
        copy.dtIni = this.dateUtils
            .convertLocalDateToServer(obiettiviInd.dtIni);
        copy.dtFine = this.dateUtils
            .convertLocalDateToServer(obiettiviInd.dtFine);
        return copy;
    }
}
