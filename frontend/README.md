# NODEJS URL Shortner

## Installation
use `npm install` in `api-backend` dir & `url-shortener-frontend` dir for install libs.

## Run Application
use `npm start` in the backend folder to start the nodejs backend service.
use `ng serve` in the frontend folder to run angular application.

## Requirement

1. NodeJs
2. MongoDB

## API
Base Url: `{host}:3000/api/v0.1/<?>`

	`GET`  - `/api/v0.1/{short_link}`   						redirect to original link
	`GET`  - `/api/v0.1/urls`  									get all short url
	`GET`  - `/api/v0.1/urls/original/:{short_link}`  			get original url
	`POST` - `/api/v0.1/urls/{url}` 							save url in the database

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


