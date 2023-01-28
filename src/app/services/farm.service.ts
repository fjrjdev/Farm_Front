import { Injectable } from '@angular/core'
import { Farm, UpdateFarm } from './../models/Farm'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'
@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private baseURL = `http://localhost:8000/api/v1/farms`
  constructor(private http: HttpClient) {}

  create(farm: Farm): Observable<any> {
    return this.http.post(`${this.baseURL}`, farm)
  }

  read(id: string | null): Observable<any> {
    if (!id) {
      return of('ID inválido')
    }
    return this.http.get(`${this.baseURL}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(`ID ${id} não encontrado`)
        }
        return of(`Erro ao carregar o ID ${id}`)
      })
    )
  }
  update(id: string | null, farm: UpdateFarm): Observable<any> {
    return this.http.patch(`${this.baseURL}/${id}`, farm)
  }
  list(): Observable<any> {
    return this.http.get(`${this.baseURL}`)
  }
}
