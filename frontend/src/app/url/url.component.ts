import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})
export class UrlComponent implements OnInit {
  links = true;
  user: any = '';
  result: any = '';
  userLinksData: any = '';
  url: String;
  urlorig: String;
  status: String;
  originalResult: any;
  error: String;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUserLinks();
  }

  getUserLinks() {
    this.apiService.getLinks().subscribe(
      res => {
        this.userLinksData = res;
        this.userLinksData.urlData.reverse();
      },
      error => {
        console.log(error);
      }
    );
  }

  originalUrl() {

    const url = this.urlorig.replace(/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1');

    this.apiService.originalUrl(url).subscribe(
      res => {
        this.originalResult = res;

        this.error = '';
      },
      error => {
        this.originalResult = '';
        this.error = 'Record Not Found';
        console.log(error);
      }
    );
  }

  shortUrl() {

    const link = {
      url: this.url
    };

    this.apiService.shortUrl(link).subscribe(
      res => {
        this.getUserLinks();
        this.url = '';

      },
      error => {
        console.log(error);
        this.url = '';
      }
    );
  }

  showLinks() {
    this.links = true;
  }

  showProfile() {
    this.links = false;
  }


}
