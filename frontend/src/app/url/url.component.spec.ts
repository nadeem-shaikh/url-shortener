import { TestBed } from '@angular/core/testing';
import { ApiService } from '../services/api.service';
import { UrlComponent } from './url.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { async, fakeAsync, inject, getTestBed, ComponentFixture, } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import 'rxjs/add/observable/from';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { DebugElement } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
const URL = 'http://www.google.com';
let URLENC = '';

describe('apiService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule, HttpClientModule],
      providers: [
        { provide: UrlComponent, useValue: '/' },
        ApiService,
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });


  it('should store and encrypt url',
    async(inject([ApiService, XHRBackend], (a, mockBackend) => {

      const link = {
        url: URL
      };
      a.shortUrl(link).subscribe((data) => {
        URLENC = data.urlCreated.name;
        expect(data.success).toBe(true);

      });

    })));

  it('should return original url provided shortern url',
    async(inject([ApiService, XHRBackend], (a, mockBackend) => {

      a.originalUrl(URLENC).subscribe((data) => {
        expect(data.url).toBeDefined();
      });

    })));

  it('should return list of urls',
    async(inject([ApiService, XHRBackend], (a, mockBackend) => {

      a.getLinks().subscribe((data) => {
        expect(data.urlData.length).toBeGreaterThanOrEqual(1);
      });

    })));


});
