import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    private _config = {
      apiHost: ''
    }
    constructor(http: HttpClient) { }
}
