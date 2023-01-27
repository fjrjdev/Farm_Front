import { Injectable } from '@angular/core'
import { Farm } from './../models/Farm'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private baseURL = `http://localhost:8000/api/v1/farms`
  constructor(private http: HttpClient) {}

  create(farm: Farm) {}

  read(id: number): Farm {
    return {} as any
  }

  list(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
  }
}
