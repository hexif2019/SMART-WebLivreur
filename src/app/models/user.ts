import {Residence} from './residence';
import {Coordonne} from './coordonne.model';

export class User {
  id?: string;
  nom?: string;
  prenom?: string;
  email?: string;
  rayon?: number;
  position?: Coordonne;
}
