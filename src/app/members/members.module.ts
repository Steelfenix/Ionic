import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { DashboardPage } from './dashboard/dashboard.page';
@NgModule({
  declarations: [DashboardPage],
  imports: [IonicModule, CommonModule, MembersRoutingModule]
})
export class MembersModule {}
