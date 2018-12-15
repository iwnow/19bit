import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class WavesService {

  constructor() { }

  get isAvailable() {
    return Boolean(window.Waves);
  }

  get waves() {
    return window.Waves;
  }

  auth(): Promise<any> {
    return this.waves.auth({
      name: environment.appName, //app’s name
      data: environment.appSecret,
      icon: environment.appIcon, // optional parameter: app’s icon (full URL)
    });
  }
}
