import {Component, OnInit, ViewChild} from '@angular/core';
import {Commande} from '../../models/commande';
import {CommandeService} from '../../services/commande.service';
import {UserService} from '../../services/user.service';
import {Magasin} from '../../models/magasin.model';
import {Article} from '../../models/article.model';
import {} from '@types/googlemaps';
import {ScriptService} from '../../services/script.service';
import {MapService} from '../../services/map.service';
import {Coordonne} from '../../models/coordonne.model';

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
    private scriptService: ScriptService,
    private mapService: MapService
  ) {
  }

  ngOnInit() {
    this.userService.requirLogin().then(user => {
      this.commandeService.getCommandesEnCour(user.id).subscribe(commandes => {
        this.currentCommandes = commandes;
        this.scriptService.loadScript('googlemap').then(_ => {

          const mapProp = {
            center: new google.maps.LatLng(45.7631724, 4.8599094),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          console.log('map load : ', this.gmapElement.nativeElement, mapProp);
          this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

          commandes.forEach(commande => {
            commande.display.markers = commande.magasins.map(
              magasin => new google.maps.Marker({
                position: {
                  lat: magasin.position.latitude,
                  lng: magasin.position.longitude
                },
                map: this.map,
                title: magasin.denomination,
                visible: false
              })
            );

            commande.display.markers.push(new google.maps.Marker({
              position: this.coordinatesToLatLng(commande.residence.position),
              map: this.map,
              title: commande.residence.adresse,
              visible: false,
              icon: {
                url: 'img/dest.png',
              }
            }));
          });
        });
      });
      this.commandeService.getCommandesArchiver(user.id).subscribe(commandes => this.oldCommandes = commandes);

    });
  }

  coordinatesToLatLng(coo: Coordonne) {
    return {
      lat: coo.latitude,
      lng: coo.longitude
    };
  }

  mapGoTo(coordinates: Coordonne) {
    this.map.setCenter(this.coordinatesToLatLng(coordinates));
  }

  selectCommande(commande: Commande) {

    if (this.selectedCommande) {
      this.selectedCommande.display.markers.forEach(marker => marker.setVisible(false));
    }

    this.selectedCommande = commande;
    this.selectedMagasin = commande.magasins[0];
    const markers: google.maps.Marker[] = this.selectedCommande.display.markers;

    markers.forEach(marker => marker.setVisible(true));

    this.mapGoTo(this.selectedMagasin.position);

    this.mapService.getRouteData(commande.magasins, commande.residence.position).subscribe(res => {
      console.log('OUIIIII! : ', res);
    });
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

  public livreurOnMagasin() {
    const magasin = this.selectedMagasin;
    const commande = this.selectedCommande;
    this.commandeService.livreurOnMagasin(commande.id, magasin.id).subscribe(() => {
      magasin.etat = 'EN_COURS_DE_LIVRAISON';
      magasin.display.status = this.commandeService.getStatusDisplayCommandeMagasin(magasin.etat);
      commande.etat = 'EN_COURS_DE_LIVRAISON';
      commande.display.status = this.commandeService.getStatusDisplayCommande(commande.etat);
    });
  }
}
