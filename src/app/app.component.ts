import {Component, TemplateRef} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {PanierService} from './services/panier.service';
import {Article} from './models/article.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
