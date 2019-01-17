# NODEJS URL Shortner

This app converts long url to short url. You can also flatten the existing shortened url created by this app.

The app uses Heroku for continuous Deployment. All commits to the master branch triggers build and is deployed on the Heroku Server.

The Live Application can be accessed at https://url-shortener-au.herokuapp.com/

Application uses free cluster of mongoDB available at https://cloud.mongodb.com for the production

## Requirement

1. NodeJs
2. MongoDB
3. Angular 6

## Version
node =  10.9.0
npm = 6.5.0
angular/cli = 6.0.3

## Build for Production

Below scripts present in url-shortener/package.json takes care of production build
"scripts": {
	"install": "pushd backend && npm install && popd",
	"postinstall": "pushd frontend && npm install",
	"start": "node backend/server.js"
}

go to URL https://url-shortener-au.herokuapp.com/

## Installation in local Environment
start mongoDB by running "mongod" in cmd
git clone https://github.com/nadeem-shaikh/url-shortener.git
cd url-shortener
npm install
npm start

In Order to run angular app in development mode
cd frontend
ng build

Go to URL http://localhost:3000

## API
Base Url: `{host}:{port}/api/v1/<?>`

	`GET`  - `/api/v1/{short_link}`   						redirect to original link
	`GET`  - `/api/v1/getAllUrls`  							get all short url
	`GET`  - `/api/v1/getOriginalUrl/:{short_link}`  		get original url
	`POST` - `/api/v1/generateShortUrl/{url}` 				generate short url and save url in the database


################# Angular App ##################################
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


