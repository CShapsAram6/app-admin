import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${environment.api}/Category/get-all`);
  }
}
