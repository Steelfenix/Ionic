import { CatalogItem } from './../../types';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalogo-items',
  templateUrl: './catalog-items.page.html',
  styleUrls: ['./catalog-items.page.scss']
})
export class CatalogoItemsPage implements OnInit {
  items: CatalogItem[] = [];

  async getData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.catalogService.getCatalogItems().subscribe(
      data => {
        this.items = data.data;
        loading.dismiss();
      },
      error => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  constructor(
    private loadingController: LoadingController,
    private catalogService: CatalogService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getData();
  }

  onClickAdd() {
    this.router.navigate(['catalog/add']);
  }

  consultarItems() {
    this.catalogService.getCatalogItems().subscribe(
      data => {
        this.items = data.data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
