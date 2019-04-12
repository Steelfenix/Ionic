import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CatalogDetailPage } from './catalog-detail/catalog-detail.page';
import { CatalogoItemsPage } from './catalog-items/catalog-items.page';


const routes: Routes = [
    {
      path: 'catalog',
      component: CatalogoItemsPage
    },
    {
      path: 'catalog/:id',
      component: CatalogDetailPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
    exports: [RouterModule]
})
export class CatalogoRoutesModule {

}
