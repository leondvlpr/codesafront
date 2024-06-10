import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private API_URL = 'http://localhost:8092/api/invoice';

  private CREATE_ROUTE = this.API_URL + '/create';

  private UPDATE_ROUTE = this.API_URL + '/update';

  private DELETE_ROUTE = this.API_URL + '/delete';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  public save(data: any): Observable<any> {
    return this.http.post(this.CREATE_ROUTE, data);
  }

  public update(data: any): Observable<any> {
    return this.http.post(this.UPDATE_ROUTE, data);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.DELETE_ROUTE + '/' + id);
  }
}
