import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
  private API_HOSTNAME = location.hostname;
  private API_PORT = environment.port;
  private API_PROTOCOL = environment.protocol;
  private API_BASE_URL = this.API_PROTOCOL + '://' + this.API_HOSTNAME + ':' + this.API_PORT + '/api/v1' ;
  private URLS_PATH = '/getAllUrls';
  private GENERATE_SHORT_URL_PATH = '/generateShortUrl';
  private ORIGINAL_PATH = '/getOriginalUrl';

  private HEADERS = new HttpHeaders({
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: HttpClient) { }

  getLinks() {

    console.log(this.API_BASE_URL + this.URLS_PATH);
    return this.http.get(this.API_BASE_URL + this.URLS_PATH, {
      headers: this.HEADERS
    });
  }

  shortUrl(url) {
    return this.http.post(this.API_BASE_URL + this.GENERATE_SHORT_URL_PATH , url, {
      headers: this.HEADERS
    });
  }


  originalUrl(url) {
    return this.http.get(this.API_BASE_URL + this.ORIGINAL_PATH + '/' + url, {
      headers: this.HEADERS
    });
  }



}
