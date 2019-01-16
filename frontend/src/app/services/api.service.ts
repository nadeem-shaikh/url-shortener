import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  private API_URL = 'http://localhost:3000/api/v1';
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
    return this.http.get(this.API_URL + this.URLS_PATH, {
      headers: this.HEADERS
    });
  }

  shortUrl(url) {
    return this.http.post(this.API_URL + this.GENERATE_SHORT_URL_PATH , url, {
      headers: this.HEADERS
    });
  }


  originalUrl(url) {
    return this.http.get(this.API_URL + this.ORIGINAL_PATH + '/' + url, {
      headers: this.HEADERS
    });
  }



}
