import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { RegisterPage } from './register/register.page';

import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [RegisterPage, LoginPage],
  imports: [CommonModule, PublicRoutingModule, IonicModule]
})
export class PublicModule {}
