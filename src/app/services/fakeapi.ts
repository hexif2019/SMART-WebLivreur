import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

export function fakeapi<T>(observableFack: Observable<T>, observable: Observable<T>):Observable<T>{
    return environment.fakeapi ? observableFack : observable;

}
