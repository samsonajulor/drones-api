import db from '../models';
import { BaseError } from '../utils';
import { DroneType } from '../@types';

const { drone } = db;

const DroneService = {
  async createDrone(droneData: DroneType) {
    try {
      const newDrone = await drone.create(droneData);
      return newDrone;
    } catch (error) {
      throw new BaseError('error from the drone service', error, 'createDrone', 500);
    }
  },
  async getIdleDrones() {
    try {
      const idleDrones = await drone.findAll({
        where: {
          state: 'IDLE',
        },
      });
      return idleDrones;
    } catch (error) {
      throw new BaseError('error from the drone service', error, 'getIdleDrones', 500);
    }
  },
  async getDroneBySerialNumber(serialNumber: string) {
    try {
      const droneFound = await drone.findOne({
        where: {
          serialNumber,
        },
      });
      return droneFound;
    } catch (error) {
      throw new BaseError('error from the drone service', error, 'getDroneBySerialNumber', 500);
    }
  },
  async updateDroneState(serialNumber: string, state: string) {
    try {
      const droneFound = await drone.findOne({
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
      throw new BaseError('error from the drone service', error, 'updateDroneState', 500);
    }
  },
  async updateDroneBattery(serialNumber: string, battery: number) {
    try {
      const droneFound = await drone.findOne({
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
      throw new BaseError('error from the drone service', error, 'updateDroneBattery', 500);
    }
  },
  async getFreeDrone(weight: number) {
    try {
      const size = 500 - weight;
      const freeDrone = await drone.findOne({
        where: {
          state: 'IDLE',
          weight: {
            [db.Sequelize.Op.lte]: size,
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
    } catch (error) {
      throw new BaseError(
        'error from the medication service',
        error,
        'attachMedicationToDrone',
        500
      );
    }
  },
};

export default DroneService;
    
