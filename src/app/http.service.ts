import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Publisher} from "./types";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) {
    }

    getPublishers() {
        
    }
}
