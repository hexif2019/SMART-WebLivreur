import { Component, OnInit } from '@angular/core';
import {Magasin} from '../models/magasin.model';
import {Article} from "../models/article.model";
import {PanierService} from "../services/panier.service";
import {UserService} from "../services/user.service";
import {Commande} from "../models/commande";

@Component({
  selector: 'app-rechercher-article',
  templateUrl: './rechercher-article.component.html',
  styleUrls: ['./rechercher-article.component.scss']
})
export class RechercherArticleComponent implements OnInit {
  articles: Article[];
  magasins: Magasin[];
  magasinKeyWords: any;
  articleKeyWords: any;
  magasinSelectioner: Magasin;

  panier: Commande;

  constructor(
    private panierService: PanierService,
    private userService: UserService
  ) {

  }

  ajouterAuPanier(article: Article, qte: number) {
    let user = this.userService.getUser();
    article.display.isBuyed = true;
    this.panierService.addArticle(user.id, this.magasinSelectioner, article, qte).subscribe(
      nouveauPagner => {

      },
      error => this.msgError(JSON.stringify(error))
    );
  }

  ngOnInit() {
    this.userService.requirLogin().then(user => {
      this.panierService.getMagasinsOfResidence(user.residence.id).subscribe(
        magasins => this.magasins = magasins,
        error => this.msgError(JSON.stringify(error))
      );

      this.panierService.getPagner(user.id).subscribe(
        panier=> this.panier = panier,
        error => this.msgError("Erreur du chargement du pagnier : " + JSON.stringify(error))
      );
    });
  }

  msgError(msg: string){

  }

  msgOk(msg: string){

  }

  selectMagasin(m: Magasin) {
    this.magasinSelectioner = m;
  }
}
