import {Article} from './article.model';
import {Coordonne} from './coordonne.model';

export class Magasin {
  id?: string;
  etat?: string;
  adresse?: string;
  description?: string;
  denomination?: string;
  email?: string;
  mdp?: string;
  produits?: Article[];
  ville?: string;
  codePostal?: string;
  img?: string;
  position?: Coordonne;
  distance?: Number;
  display?: any;
}
