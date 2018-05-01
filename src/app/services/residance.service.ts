import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Residence} from "../models/residence";

@Injectable()
export class ResidanceService {
  constructor(private http: HttpClient) {}

  findResidanceFormCodePostal(codePostal: string): Observable<Residence[]>{
    //TODO ONAPI return this.http.post<Residence[]>('/api/findResidanceFormCodePostal',{codePostal: codePostal});
    return this.http.get<Residence[]>('/api/findResidanceFormCodePostal.json');//TODO RM ONAPI
  }
}
