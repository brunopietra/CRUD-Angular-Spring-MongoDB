import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  addPerson(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('http://localhost:8080/people', data, httpOptions);
  }

  getPeopleList(): Observable<any> {
    return this.http.get('http://localhost:8080/people');
  }

  editPerson(data: any, id: String): Observable<any> {
    return this.http.put('http://localhost:8080/people/' + id, data);
  }

  deletePerson(id: String): Observable<any> {

    return this.http.delete('http://localhost:8080/people/' + id);
  }
}
