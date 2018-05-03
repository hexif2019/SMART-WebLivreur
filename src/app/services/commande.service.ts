import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fakeapi} from './fakeapi';
import {Commande} from '../models/commande';

@Injectable()
export class CommandeService {

  constructor(private http: HttpClient) {

  }

  getStatusDisplayCommande(status: string): any {
    switch (status) {
      case 'EDITION':
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN':
      case 'VALIDE_MAGASINS_MAIS_MODIF':
        return {etat: 'danger', title: status}; // (nomrmalement imposible)
      case 'ANNULATION_MAGASIN':
      case 'ANNULATION_CLIENT':
      case 'ANNULATION_SYSTEM':
        return {
          etat: 'danger',
          title: 'Commande annulée'
        };
      case 'ATTRIBUE_A_COURSIER':
        return {etat: 'success', title: 'La commande vous a été attribuée pour une livraison future'};
      case 'EN_COURS_DE_LIVRAISON':
        return {etat: 'success', title: 'Vous êtes en train de livrer la commande'};
      case 'DANS_CASIER':
      case 'RECUPERE_CLIENT':
      case 'CASIER_TIMEOUT':
        return {etat: 'danger', title: 'Terminée'};
      default:
        return {etat: 'danger', title: 'Unknow! : ' + (status || 'undefined')};
    }
  }

  getStatusDisplayCommandeMagasin(status: string): any {
    switch (status) {
      case 'EDITION':
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN':
      case 'VALIDE_MAGASINS_MAIS_MODIF':
        return {etat: 'danger', title: status}; // (nomrmalement imposible)
      case 'ANNULATION_MAGASIN':
      case 'ANNULATION_CLIENT':
      case 'ANNULATION_SYSTEM':
        return {
          etat: 'danger',
          title: 'Commande annulée'
        };
      case 'ATTRIBUE_A_COURSIER':
        return {etat: 'warning', title: 'A récupérer'};
      case 'EN_COURS_DE_LIVRAISON':
        return {etat: 'success', title: 'Récupérée'};
      case 'DANS_CASIER':
        return {etat: 'success', title: 'Livrée'};
      case 'RECUPERE_CLIENT':
        return {etat: 'success', title: 'Livrée'};
      case 'CASIER_TIMEOUT':
        return {etat: 'success', title: 'Livrée'};
      default:
        return {etat: 'danger', title: 'Unknow! : ' + (status || 'undefined')};
    }
  }

  private addCommandesDiplayData(commandes: Commande[]): Commande[] {
    commandes.forEach(commande => this.addCommandeDiplayData(commande));
    return commandes;
  }

  private addCommandeDiplayData(commande: Commande): Commande {
    commande.magasins.forEach(magasin => {
      magasin.display = {
        status: this.getStatusDisplayCommandeMagasin(magasin.etat)
      };
    });
    commande.display = {
      status: this.getStatusDisplayCommande(commande.etat)
    };
    return commande;
  }

  getCommandesEnCour(userid: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/livreur/getCommandesEnCour/' + userid)
    ).map(commandes => this.addCommandesDiplayData(commandes));
  }

  getCommandesArchiver(id: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/livreur/getCommandesArchiver/' + id)
    ).map(commandes => this.addCommandesDiplayData(commandes));
  }

  livreurOnMagasin(idCommande: string | undefined, idMagasin: string | undefined) {
    return fakeapi(
      this.http.get<Commande>('/api/commande.json'),
      this.http.get<Commande>('/api/livreur/onMagasin/' + idCommande + '/' + idMagasin)
    );
  }
}
