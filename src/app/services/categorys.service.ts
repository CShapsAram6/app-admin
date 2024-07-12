import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { categoryDtos } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategorysService {
  constructor(private http: HttpClient) {}

  getData(): Observable<categoryDtos[]> {
    return this.http.get<categoryDtos[]>(`${environment.api}/Category/get-all`);
  }
}
