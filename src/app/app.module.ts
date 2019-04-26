import { environment } from './../environments/environment.prod';
import { CatalogoModule } from './catalogo/catalogo.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import {
  IonicModule,
  IonicRouteStrategy,
  ToastController
} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { PublicModule } from './public/public.module';
import { MembersModule } from './members/members.module';
import { MapModule } from './map/map.module';
import { AngularFireModule } from '@angular/fire';
import { environmentDev } from '../environments/environment.dev';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CatalogoModule,
    IonicStorageModule,
    IonicStorageModule.forRoot(),
    PublicModule,
    MapModule,
    MembersModule,
    AngularFireModule.initializeApp(environmentDev.firebase),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    Firebase,
    ToastController,
    FcmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
