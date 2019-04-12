import { CatalogType, CatalogBrand, Image } from './../../types';
import { Component, OnInit, ChangeDetectorRef, ɵConsole } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { CatalogService } from '../catalog.service';
import {
  ToastController,
  LoadingController,
  ActionSheetController,
  Platform
} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';

import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.page.html',
  styleUrls: ['./catalog-detail.page.scss']
})
export class CatalogDetailPage implements OnInit {
  types: CatalogType[];
  brands: CatalogBrand[];

  form: FormGroup;

  title: string;

  submitAction: () => void;

  img: Image;

  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private toasController: ToastController,
    private router: Router,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private plt: Platform,
    private ref: ChangeDetectorRef,
    private filePath: FilePath
  ) {}

  ngOnInit() {
    console.log('test');
    const id = this.route.snapshot.paramMap.get('id');
    if (!isNaN(Number(id))) {
      this.getData(id);
      this.title = 'Update Item';
      this.submitAction = () => {
        this.sendData(
          this.catalogService.updateProduct(this.form.value),
          'Loading ...',
          'Item sucessfully updated',
          '/catalog',
          'Error updating item'
        );
      };
    } else {
      this.title = 'Add Item';
      this.submitAction = () => {
        this.sendData(
          this.catalogService.addProduct(
            this.form.value,
            this.img.blob,
            this.img.name
          ),
          'Loading ...',
          'Item sucessfully added',
          '/catalog',
          'Error adding item'
        );
      };
    }

    this.getCatalogBrands();
    this.getCatalogTypes();

    this.form = this.formBuilder.group({
      Id: new FormControl(''),
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      Price: new FormControl('', [Validators.required, Validators.min(0)]),
      CatalogBrandId: new FormControl(this.brands, Validators.required),
      CatalogTypeId: new FormControl(this.types, Validators.required),
      PictureFileName: new FormControl('1.png')
    });
  }

  async presentToast(message: string) {
    const toast = await this.toasController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async sendData(
    dataObservable: Observable<any>,
    loadingMessage: string,
    successMessage: string,
    redirectRoute: string,
    failureMessage: string
  ) {
    const loading = await this.loadingController.create({
      message: loadingMessage
    });
    await loading.present();
    dataObservable.subscribe(
      () => {
        this.presentToast(successMessage);
        this.router.navigateByUrl(redirectRoute);
        loading.dismiss();
      },
      error => {
        this.presentToast(failureMessage);
        console.log(error);
        loading.dismiss();
      }
    );
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source: ',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'From Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async getData(id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.catalogService.getCatalogItem(id).subscribe(
      data => {
        this.form.patchValue({
          Id: data.id,
          Name: data.name,
          Description: data.description,
          Price: data.price,
          CatalogBrandId: data.catalogBrandId,
          CatalogTypeId: data.catalogTypeId,
          PictureFileName: data.PictureFileName
        });
        loading.dismiss();
      },
      error => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  getCatalogTypes() {
    this.catalogService.getCatalogTypes().subscribe(
      data => {
        this.types = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCatalogBrands() {
    this.catalogService.getCatalogBrands().subscribe(
      data => {
        this.brands = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  async startUpload(imgEntry: Image) {
    const entry = await this.file.resolveLocalFilesystemUrl(imgEntry.filePath);
    const file = await this.getFile(entry);
    this.img.blob = await this.readFile(file);
  }

  async getFile(fileEntry) {
    try {
      return await new Promise((resolve, reject) =>
        fileEntry.file(resolve, reject)
      );
    } catch (err) {
      console.log(err);
    }
  }

  readFile(file: any): Promise<Blob> {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onloadend = () => {
        const imgBlob = new Blob([reader.result], {
          type: file.type
        });

        resolve(imgBlob);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  pathForImage(img: string) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  copyFileToLocationDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, this.file.dataDirectory, newFileName)
      .then(
        success => {
          this.updateStoredImage(newFileName);
        },
        error => {
          this.presentToast('Error while storing file');
        }
      );
  }

  deleteImage(imgEntry) {
    const correctPath = imgEntry.filePath.substr(
      0,
      imgEntry.filePath.lastIndexOf('/') + 1
    );

    this.file.removeFile(correctPath, imgEntry.name).then(res => {
      this.presentToast('File removed.');
      this.img = undefined;
    });
  }

  updateStoredImage(name: string) {
    const filePath = this.file.dataDirectory + name;
    const resPath = this.pathForImage(filePath);

    const img: Image = {
      name: name,
      path: resPath,
      filePath: filePath
    };

    this.img = img;
  }

  createFileName(): string {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  async onSubmit() {
    if (this.img.name !== '') {
      await this.startUpload(this.img);
    }
    this.submitAction();
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (
        this.plt.is('android') &&
        sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
      ) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          const correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          const currentName = imagePath.substring(
            imagePath.lastIndexOf('/') + 1,
            imagePath.lastIndexOf('?')
          );
          this.copyFileToLocationDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        });
      } else {
        const currectName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocationDir(
          correctPath,
          currectName,
          this.createFileName()
        );
      }
    });
  }
}
