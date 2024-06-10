import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private API_URL = 'http://localhost:8092/api/resources';

  private CREATE_ROUTE = this.API_URL + '/create';



  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  save(data: any): Observable<any> {
    return this.http.post(this.CREATE_ROUTE, data);
  }
}
