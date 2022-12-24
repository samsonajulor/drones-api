import db from '../models';
import { BaseError } from '../utils';
import { DroneType } from '../@types';

const { Drone } = db;

const DroneService = {
  async create(droneData: DroneType) {
    try {
      const newDrone = await Drone.create(droneData);
      return newDrone;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the drone service', error, 'create', httpCode);
    }
  },
  async getAvailableDrones() {
    try {
      const idleDrones = await Drone.findAll({
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
      const droneFound = await Drone.findOne({
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
      const droneFound = await Drone.findOne({
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
      const droneFound = await Drone.findOne({
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
      const freeDrone = await Drone.findOne({
        where: {
          weight: {
            [db.Sequelize.Op.lte]: size,
          },
          state: {
            [db.Sequelize.Op.or]: ['IDLE', 'LOADING'],
          },
        },
      });
      if (!freeDrone)
        throw new BaseError(
          'error from the medication service',
          'No free drone found. Consider reducing the weight.',
          'attachMedicationToDrone',
          404
        );
      await freeDrone.update({
        state: 'LOADING',
      });
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
};

export default DroneService;
