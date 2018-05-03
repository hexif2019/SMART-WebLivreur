import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Coordonne} from '../models/coordonne.model';
import * as _ from 'lodash';
import {Magasin} from '../models/magasin.model';

export class RepGoogleRoad {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: {
    'elements': {
      'distance': {
        'text': string,
        'value': number
      },
      'duration': {
        'text': string,
        'value': number
      },
      'status': string
    }[]
  }[];
  status: string;
}

@Injectable()
export class MapService {

  constructor(
    private http: HttpClient
  ) {
  }


  getRouteData(magasins: Magasin[], destination: Coordonne, livreurCoordonne?: Coordonne) {
    const params = {
      key: 'AIzaSyA11pIB44sN4i7rCFBvVA9uIRMwrBDBl3o',
      origin: livreurCoordonne && livreurCoordonne.latitude + ',' + livreurCoordonne.longitude,
      destination: destination.latitude + ',' + destination.longitude,
      waypoints: magasins.map(magasin => magasin.position).map(pos => pos.latitude + ',' + pos.longitude)
    };
    params.origin = params.origin || _.pullAt(params.waypoints, 0);
    return this.http.get(
      'https://maps.googleapis.com/maps/api/directions/json',
      {params: params}
    );
  }
}
