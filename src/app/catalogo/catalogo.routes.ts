import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CatalogDetailPage } from './catalog-detail/catalog-detail.page';
import { CatalogoItemsPage } from './catalog-items/catalog-items.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogoItemsPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'catalog/:id',
    component: CatalogDetailPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogoRoutesModule {}
