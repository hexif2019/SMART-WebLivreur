import {Component, OnInit, ViewChild} from '@angular/core';
import {Commande} from '../../models/commande';
import {CommandeService} from '../../services/commande.service';
import {UserService} from '../../services/user.service';
import {Magasin} from '../../models/magasin.model';
import {Article} from '../../models/article.model';
import {} from '@types/googlemaps';
import {ScriptService} from '../../services/script.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent implements OnInit {
  currentCommandes: Commande[];
  oldCommandes: Commande[];
  selectedCommande: Commande;
  selectedMagasin: Magasin;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  viewAllOldCommande = false;

  constructor(
    private commandeService: CommandeService,
    private userService: UserService,
    private scriptService: ScriptService
  ) {
  }

  ngOnInit() {
    this.userService.requirLogin().then(user => {
      this.commandeService.getCommandesEnCour(user.id).subscribe(commandes => this.currentCommandes = commandes);
      this.commandeService.getCommandesArchiver(user.id).subscribe(commandes => this.oldCommandes = commandes);
    });
    this.scriptService.loadScript('googlemap').then(_ => {

      const mapProp = {
        center: new google.maps.LatLng(45.7631724, 4.8599094),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    });
  }

  selectCommande(commande: Commande) {
    this.selectedCommande = commande;
    this.selectedMagasin = commande.magasins[0];
  }

  selectMagasin(magasin: Magasin) {
    this.selectedMagasin = magasin;
  }

  countNbProduit(produits: Article[]) {
    return produits.reduce((acc, produit) => acc + produit.nb, 0);
  }

  countPrix(produits: Article[]) {
    return produits.reduce((acc, produit) => acc + produit.prix * produit.nb, 0);
  }
}
