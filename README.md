# Micro Frontend Shopping Cart

## Technologies used:
* Vue 
* Redux
* ImportMaps 
* Typescript
* Nodejs

## Packages
Micro Frontend Pages `./packages`
* Application Shell
* Carts 
* Products

## Stores
Micro Frontend state management `./stores`
* store
* types
* products
* carts

## Getting Started
```
git clone https://github.com/aelbore/micro-frontend-cart.git
cd micro-frontend-cart
yarn install
```

## Build
```
yarn build:all
```

## Run and Start
```
yarn start
```
* This will start 4 hosts
  * App Shell - port `5000`
  * Carts     - port `3010`
  * Products  - port `3011`
  * Stores    - port `3012`
 

## Browse 
* Go to `http://localhost:5000`


## TODO
* Use Docker and Nginx as web server
* Children route with query parameters
* React as Micro Frontend Page
* Dynamically create import maps in index.html
* Dev Mock API
* Folder Structure