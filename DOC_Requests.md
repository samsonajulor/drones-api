
1. Create Drone
**POST**
`http://localhost:6666/dispatch/v1.0/api/drone/`
- Accepts model and battery as the request body.
- Creates a unique drone with serialNumber and set its state as - IDLE.
- The default weight of the drone is 0grams.
- It throws an error when an invalid model is used.
- It throws an error whrn battery is above 100% or below 0%.

```
{
    "model": "Lightweight",
    "battery": 0
}
```

2. get battery level
**GET**
`http://localhost:6666/dispatch/v1.0/api/drone/1`
- This get request return the battery level of a drone specified by its serial number as param.
- It throws an error if an invalid serial number is parsed in the param.

```
{
    "name": "The Best Drone Ever",
    "weight": 100,
    "code": "BUZZ",
    "battery": 100
}
```

3. get available drones
**GET**
`http://localhost:6666/dispatch/v1.0/api/drone/idle`
- This request returns a list of drones with state as IDLE or LOADING
- It throws an not found error if no drones are available.


4. load drone with medication
**POST**
`http://localhost:6666/dispatch/v1.0/api/medication/`
- Attempts a load an available drone with medication
- Throws an error if the name field contains invalid characters. - The name should contain only letters, numbers, underscores and dashes.
- Throws and error if the code contains invalid characters. The code should contail only capital letter, numbers and underscores.
- The weight should not exceed 500grams.
- Would not load a drone if the drone's weight would exceed 500 after the medication has been added.

```
{
    "name": "The Best Drone Ever",
    "weight": 8,
    "code": "BUZZ"
}
```

5. get medication item(s) by drone serial number
**GET**
`http://localhost:6666/dispatch/v1.0/api/medication/1`
- attempts to retrieve all medication items for a given drone serial number in the request params.
- Throws an error if the parsed drone serial number has no medication item loaded yet.

6. upload medication image
**POST**
`http://localhost:6666/dispatch/v1.0/api/medication/image?medicationId=51ad7009-8670-4125-a488-ff1e0014e724`
- Takes medicationId as the request query.
- The form field should have drone-images for image upload.
- The image should not exceed 5mb.
- The image should be .png, .jpg or .jpeg
**Query Params**
`medicationId: 51ad7009-8670-4125-a488-ff1e0014e724`
**Bodyform-data**
`drone-images: Screenshot_20221119_094406.png`