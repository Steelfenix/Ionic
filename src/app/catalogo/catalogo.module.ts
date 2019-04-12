import { CatalogoRoutesModule } from './catalogo.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CatalogService } from './catalog.service';
import { CatalogDetailPage } from './catalog-detail/catalog-detail.page';
import { CatalogItemComponent } from './catalog-items/catalog-item/catalog-item.component';
import { CatalogoItemsPage } from './catalog-items/catalog-items.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageThumbnailComponent } from './catalog-detail/image-thumbnail/image-thumbnail.component';

@NgModule({
  declarations: [
    CatalogDetailPage,
    CatalogoItemsPage,
    CatalogItemComponent,
    ImageThumbnailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CatalogoRoutesModule,
    ReactiveFormsModule
  ],
  providers: [CatalogService]
})
export class CatalogoModule {}
