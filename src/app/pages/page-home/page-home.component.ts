import { Component, OnInit } from '@angular/core';
import { Commande } from '../../models/commande';
import { CommandeService } from '../../services/commande.service';
import { UserService } from '../../services/user.service';
import { Magasin } from '../../models/magasin.model';

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

  viewAllOldCommande = false;

  constructor(
    private commandeService: CommandeService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.requirLogin().then(user => {
      this.commandeService.getCommandesEnCour(user.id).subscribe(commandes => this.currentCommandes = commandes);
      this.commandeService.getCommandesArchiver(user.id).subscribe(commandes => this.oldCommandes = commandes);
    });
  }

  selectCommande(commande: Commande) {
    this.selectedCommande = commande;
  }

  selectMagasin(magasin: Magasin) {

  }
}
