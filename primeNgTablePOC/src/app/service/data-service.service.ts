import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { model } from '../model/data';
import { columnHeaders } from '../model/columnHeaders';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  dataurl = 'http://localhost:3000/dataArray';
  colsurl = 'http://localhost:3000/cols';


  constructor(private http: HttpClient) { }

  // get table header
  getAllCols(): Observable<columnHeaders[]> {
    return this.http.get<columnHeaders[]>(this.colsurl);
  }

  // save table header
  saveAllCols(colsdata: columnHeaders) {
    return this.http.post(this.colsurl, colsdata, httpOptions);
  }

  // get data list
  getAllData(): Observable<model[]> {
    return this.http.get<model[]>(this.dataurl);
  }

}
