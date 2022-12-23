import db from '../models';
import { BaseError } from '../utils';
import { MedicationType } from '../@types';
import DroneService from './drone';

const { Medication } = db;

const MedicationService = {
  async loadDroneWithMedication(medicationData: MedicationType) {
    try {
      const freeDrone = await DroneService.getFreeDrone(medicationData.weight);
      /** medication can be safely loaded cos there was a weight check by the function above */
      await Medication.create({
        ...medicationData,
        droneSerialNumber: freeDrone.serialNumber,
      });
      const weight = medicationData.weight + freeDrone.weight;
      await freeDrone.update({
        state: weight === 500 ? 'LOADED' : 'LOADING',
        weight,
      });
      return freeDrone;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the medication service', error, 'createMedication', httpCode);
    }
  },
};

export default MedicationService;