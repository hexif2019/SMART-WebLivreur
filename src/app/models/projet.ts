import {Residence} from "./residence";
import {Magasin} from "./magasin.model";
import {Commande} from "./commande";

export class Projet{
  residence ?: Residence;
  magasins?: Magasin[];
  pagnier?: Commande;
}
