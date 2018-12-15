import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    private _config = {
      apiHost: ''
    }
    constructor(http: HttpClient) { }
}
