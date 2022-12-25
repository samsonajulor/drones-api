import db from '../models';
import { BaseError } from '../utils';
import { DroneType, HttpStatusCode } from '../@types';

const { Drones } = db;

const DroneService = {
  async create(droneData: DroneType) {
    try {
      /**do not create a new drone if the total number of drones are up to ten */
      const totalDrones = await Drones.count();
      if (totalDrones === 10)
        throw new BaseError(
          'error from the drone service', 
          'The maximum number of drones has been reached. Please delete a drone before creating a new one.',
          'create',
          HttpStatusCode.NOT_ALLOWED
        );
      const newDrone = await Drones.create(droneData);
      // await Drones.save(newDrone);
      return newDrone;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'create', httpCode);
    }
  },
  async getAvailableDrones() {
    try {
      const idleDrones = await Drones.findAll({
        where: {
          state: {
            [db.Sequelize.Op.or]: ['IDLE', 'LOADING'],
          },
        },
      });
      return idleDrones;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'getIdleDrones', httpCode);
    }
  },
  async getDroneBySerialNumber(serialNumber: string) {
    try {
      const droneFound = await Drones.findOne({
        where: {
          serialNumber,
        },
      });
      if (!droneFound)
        throw new BaseError(
          'error from the drone service',
          'Drone not found',
          'updateDroneBattery',
          404
        );
      return droneFound;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError(
        'error from the drone service',
        error,
        'getDroneBySerialNumber',
        httpCode
      );
    }
  },
  async updateDroneState(serialNumber: string, state: string) {
    try {
      const droneFound = await Drones.findOne({
        where: {
          serialNumber,
        },
      });
      if (!droneFound)
        throw new BaseError(
          'error from the drone service',
          'Drone not found',
          'updateDroneState',
          404
        );
      await droneFound.update({
        state,
      });
      return droneFound;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'updateDroneState', httpCode);
    }
  },
  async updateDroneBattery(serialNumber: string, battery: number) {
    try {
      const droneFound = await Drones.findOne({
        where: {
          serialNumber,
        },
      });
      if (!droneFound)
        throw new BaseError(
          'error from the drone service',
          'Drone not found',
          'updateDroneBattery',
          404
        );
      await droneFound.update({
        battery,
      });
      return droneFound;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'updateDroneBattery', httpCode);
    }
  },
  async getFreeDrone(weight: number) {
    try {
      const size = 500 - weight;
      if (size < 0)
        throw new BaseError(
          'error from the medication service',
          'The weight of the medication is too high',
          'attachMedicationToDrone',
          HttpStatusCode.NOT_ALLOWED
        );
      const drones = await this.getAvailableDrones();
      if (drones.length === 0)
        throw new BaseError(
          'error from the medication service',
          'There are no drones available',
          'attachMedicationToDrone',
          HttpStatusCode.NOT_FOUND
        );
      /**Put the weights of the drones in an array */
      const weights = drones.map((drone: DroneType) => drone.weight);
      /**find the index of the first drone with weight less than or equal to size */
      const index = weights.findIndex((weight: number) => weight <= size);
      if (index === -1)
        throw new BaseError(
          'error from the medication service',
          `Drones should not be overloaded. List of drone weights: ${weights.map((weight: string, index: number) => `Drone ${drones[index].serialNumber}=>${weight}g`)}`,
          'attachMedicationToDrone',
          HttpStatusCode.NOT_ALLOWED
        );
      /**put the battery capacity of each drone in an array */
      const batteries = drones.map((drone: DroneType) => drone.battery);
      /**find the index of the first drone with battery capacity greater than 25 */
      const batteryIndex = batteries.findIndex((battery: number) => battery > 25);
      if (batteryIndex === -1)
        throw new BaseError(
          'error from the medication service',
          `Drones need to be recharged. See the list of battery capacity: ${batteries.map(
            (battery: string, index: number) => `Drone ${drones[index].serialNumber}=>${battery}g`
          )}`,
          'attachMedicationToDrone',
          HttpStatusCode.NOT_ALLOWED
        );
      /**find the first drone with weight less than or equal to size and battery capacity greater than 25 */
      const freeDrone = drones.find((drone: DroneType) => drone.weight <= size && drone.battery > 25);
      if (!freeDrone) throw new BaseError(
          'error from the medication service',
          'There are no drones available',
          'attachMedicationToDrone',
          HttpStatusCode.NOT_FOUND
        );
      /**update the state of the free drone to loading and save to db*/
      await this.updateDroneState(freeDrone.serialNumber, 'LOADING');
      return freeDrone;
    } catch (error: any) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError(
        'error from the medication service',
        error,
        'attachMedicationToDrone',
        httpCode
      );
    }
  },
  async getAll() {
    try {
      const drones = await Drones.findAll();
      return drones;
    } catch (error: any) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'getAll', httpCode);
    }
  },
};

export default DroneService;
