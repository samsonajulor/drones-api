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
  async getMedicationByDroneSerialNumber(serialNumber: string) {
    try {
      const medicationFound = await Medication.findAll({
        where: {
          droneSerialNumber: serialNumber,
        },
      });
      if (!medicationFound || !medicationFound.length)
        throw new BaseError(
          'error from the medication service',
          'No loaded medication(s) found for that drone serial number. Please use a different serial number.',
          'getMedicationBySerialNumber',
          404
        );
      return medicationFound;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError(
        'error from the medication service',
        error,
        'getMedicationBySerialNumber',
        httpCode
      );
    }
  },
};

export default MedicationService;