import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {fakeapi} from "./fakeapi";
import {Commande} from "../models/commande";

@Injectable()
export class CommandeService {

  constructor(private http: HttpClient) {

  }

  private getStatusDisplayCommande(status: string): any{
    switch (status){
      case 'EDITION': return {etat: "danger", title: "Pagnier!"}; // (nomrmalement imposible)
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN': return {etat: "success", title: "En attante de la confiramation des magasins", titleOne : "En attante de la confiramation du magasin"};
      case 'ANNULATION_CLIENT': return {etat: "danger", title: "Vous avez annuler la commande", titleOne : "Vous avez annuler la commande" };
      case 'ANNULATION_SYSTEM': return {etat: "danger", title: "Votre commande ne peut pas étre livrai a l'heur voulu", titleOne : "Votre commande ne peut pas étre livrai a l'heur voulu" };
      case 'ANNULATION_MAGASIN': return {etat: "danger", title: "Les magasins n'ont pas pus fournir les articles voulus", titleOne: "Le magasin n'a pas pus fournir les articles voulus" };
      case 'VALIDE_MAGASINS_MAIS_MODIF': return {etat: "warning", title: "Cetins aticles de votre commande on étais modifier par un magasin", titleOne: "Cetins aticles de votre commande on étais modifier par le magasin" };
      case 'ATTRIBUE_A_COURSIER': return {etat: "success", title: "Votre commande vas bientôt arriver"};
      case 'EN_COURS_DE_LIVRAISON': return {etat: "success", title: "Votre commande est en chemain"};
      case 'DANS_CASIER': return {etat: "success", title: "Votre commande vous attand"};
      case 'RECUPERE_CLIENT': return {etat: "success", title: "Terminer"};
      case 'CASIER_TIMEOUT': return {etat: "danger", title: "Vous n'avais pas recuperer votre commande!"};
      default: return {etat: "danger", title: "Unknowd! : " + (status || "undefined")}
    }
  }

  private getStatusDisplayCommandeMagasin(status: string): any{
    switch (status){
      case 'EDITION': return {etat: "danger", title: "Pagnier!"}; // (nomrmalement imposible)
      case 'PAYEMENT_EFFECTUE':
      case 'ATTENTE_CONFIRMATION_MAGASIN': return {etat: "warning", title: "Attent de confirmation"};
      case 'ANNULATION_CLIENT': return {etat: "danger", title: "annuler" };
      case 'ANNULATION_SYSTEM': return {etat: "danger", title: "annuler"};
      case 'ANNULATION_MAGASIN': return {etat: "danger", title: "annuler par le magasin"};
      case 'VALIDE_MAGASINS_MAIS_MODIF': return {etat: "warning", title: "Modifier"};
      case 'ATTRIBUE_A_COURSIER': return {etat: "success", title: "en attant du livreur"};
      case 'EN_COURS_DE_LIVRAISON': return {etat: "success", title: "en livreson"};
      case 'DANS_CASIER': return {etat: "success", title: "Livrer"};
      case 'RECUPERE_CLIENT': return {etat: "success", title: "Livrer"};
      case 'CASIER_TIMEOUT': return {etat: "success", title: "Livrer!"};
      default: return {etat: "danger", title: "Unknowd! : " + (status || "undefined")}
    }
  }

  private addCommandesDiplayData(commandes: Commande[]): Commande[]{
    commandes.forEach(commande => this.addCommandeDiplayData(commande));
    return commandes;
  }

  private addCommandeDiplayData(commande: Commande): Commande{
    commande.magasins.forEach(magasin => {
      magasin.display = {
        status: this.getStatusDisplayCommandeMagasin(magasin.etat)
      }
    });
    commande.display={
      status: this.getStatusDisplayCommande(commande.etat)
    }
    return commande;
  }

  getCommandesEnCour(userid: string){
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getCommandesEnCour/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }

  getCommandesArchiver(id: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getCommandesArchiver/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }

  getLastCommandes(id: string) {
    return fakeapi(
      this.http.get<Commande[]>('/api/commandes.json'),
      this.http.get<Commande[]>('/api/getLastCommandes/${userid}')
    ).map(commandes => this.addCommandesDiplayData(commandes))
  }
}
