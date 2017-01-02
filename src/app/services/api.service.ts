import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Response } from "@angular/http";
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ApiService {

    private baseUrl = 'https://kazoku-server-2016.herokuapp.com/api/v1/';
    //private baseUrl = 'http://localhost:3333/api/v1/';

    constructor(private authHttp: AuthHttp) {}

    get(action: string, data?: any) {
        var url = this.baseUrl+action+".json"; 
        var params = this.toParams(data); 
        //console.log("ApiService#get url="+url+"  params...",data);
        return this.authHttp
            .get(url, {search: params} )
            .do(data => { console.log("ApiService#get: data...",data); })
            .map((response: Response) => response.json());
    }

    toParams(data) :URLSearchParams {
        var result: URLSearchParams = new URLSearchParams();
        for (let key in data) result.set(key,data[key]);
        return result;
    }
}