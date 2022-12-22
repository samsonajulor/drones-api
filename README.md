## TECHNOLOGIES USED

1. Express/Node as servers
2. POSTGRESQL.

## STEPS TAKEN

- create a drone entity with the following fields:

```
{
 serialNumber: string;
 model: string;
 weight: number;
 battery: number;
 state: string;
}
```

- Add the following validations when creating a drone:

1. serial number should not exceed 100 characters
2. model should have the following strings as default values:
   ("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight")
3. weight is a number in grams and should neither be below 0 grams nor above 500 grams.
4. battery capacity is a value in numbers and should neither be below 0% nor above 100%.
5. state should have the following strings as default values:
   ("IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING")

- create a medication entity with the following fields:

```
{
 name: string;
 weight: number;
 code: string;
 image: string;
}
```

- Add the following validations when creating a medication:

1. the name should only allow letters, numbers, - and \_.
2. code should only allow uppercase letters, underscore and numbers.

- create the following services:

1. adding a new drone to existing drones.
2. adding medication items to a drone. The maximum weight is 500grams
3. get medication items for a drone. It should take in the drone id/serialNumber.
4. get available drones.

# todo list

1. initialize the express application
2. create a postgres schema for drones and medications. drone can have many medications and a medication can only have one drone.
3. add the types and utils
4. add the validations
5. connect the validation to the middlewares
6. add the middlewares to the routes
7. create the services
8. connect the service to the controllers
