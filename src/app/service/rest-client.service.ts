import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { CustomHttpParameterEncoder } from '../utils/custom-http-parameter-encoder';

@Injectable({
  providedIn: 'root'
})

export class RestClientService {

  // urlPrefix = "http://localhost:8080";
  constructor(
    private http: HttpClient

  ) { }

  
  submitFormData(url: string, params: {}, headers?: HttpHeaders): Promise<any> {
    let postHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    if (headers) {
      headers.keys().forEach(key => {
        postHeaders = postHeaders.append(key, headers.get(key));
      });
    }
    let body = new HttpParams({ encoder: new CustomHttpParameterEncoder() });
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        body = body.append(key, value);
      }
    }
    return this.http
      .post(url, body.toString(), { headers: postHeaders, responseType: "text" })
      .toPromise()
      .catch(this.handleError);
  }

  post(url: string, params?:{}): Promise<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(url, params,{headers}).toPromise().catch(this.handleError);
  }

  get(url: string, params?:{}): Promise<any> {
    let getParams = new HttpParams();
    if (params) {
      for (const p in params) {
        if (params.hasOwnProperty(p)) {
          getParams = getParams.set(p, params[p]);
        }
      }
    }
    return this.http.get(url,{params:getParams}).toPromise().catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
