import db from '../models';
import { BaseError } from '../utils';
import { MedicationType } from '../@types';
import DroneService from './drone';

const { medication } = db;

const MedicationService = {
  async createMedication(medicationData: MedicationType) {
    try {
      const freeDrone = await DroneService.getFreeDrone(medicationData.weight);
      const newMedication = await medication.create({
        ...medicationData,
        droneSerialNumber: freeDrone.serialNumber,
      });
      await freeDrone.update({
        state: 'LOADED',
      });
      return newMedication;
    } catch (error) {
      throw new BaseError('error from the medication service', error, 'createMedication', 500);
    }
  },
};

export default MedicationService;