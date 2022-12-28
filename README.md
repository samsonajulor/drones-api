# Before Starting

- create a .env file in the root directory and copy the content of .env.sample into it

## install external tools

- install postgres, pgAdmin, node@16.18.1 into your local machine

## install dependencies

- run `yarn`

## create database

- run `db:create`
  This would create a dev database called dispatch-controller-dev which can be viewed with pg admin or postgres cli.

# Starting...

## start the application in dev mode

- run `yarn dev`

# Running the tests

- run `yarn test`

Read the postman documentation [Here!](https://documenter.getpostman.com/view/18357475/2s8Z6x3ttX) OR [HERE!](./DOC_Requests.md)

# Available tests

1. [Creating of drones](./src/controllers/drone/__test__/create.test.ts)
2. [Retrieving available drones](./src/controllers/drone/__test__/getAvailableDrones.test.ts)
3. [Loading drone medication items](./src/controllers/drone/__test__/loadMedication.test.ts)
4. [Validate Model Input](./src/test/checkModel.test.ts)
5. [Check Number of Drones](./src/test/checkNumberOfDrones.test.ts)
6. [Validate Loading Medication](./src/test/validateLoadingMedication.test.ts)