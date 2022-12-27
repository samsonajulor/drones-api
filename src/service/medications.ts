import db from '../models';
import { v4 as uuidv4 } from 'uuid';
import { BaseError } from '../utils';
import { MedicationType } from '../@types';
import DroneService from './drone';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

const { Medications } = db;
class MedicationService {
  async loadMedication(medicationData: MedicationType) {
    try {
      medicationData.medicationId = uuidv4();
      const freeDrone = await DroneService.getFreeDrone(medicationData.weight);
      /** medication can be safely loaded cos there was a weight check by the function above */
      await Medications.create({
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
  }
  async getMedicationBySerialNumber(serialNumber: string) {
    try {
      const medicationFound = await Medications.findAll({
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
  }
  async getMedicationByMedicationId(medicationId: string) {
    try {
      const medicationFound = await Medications.findOne({
        where: {
          medicationId,
        },
      });
      if (!medicationFound)
        throw new BaseError(
          'error from the medication service',
          'No loaded medication found for that medication id. Please use a different medication id.',
          'getMedicationByMedicationId',
          404
        );
      return medicationFound;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError(
        'error from the medication service',
        error,
        'getMedicationByMedicationId',
        httpCode
      );
    }
  }
  async updateMedicationImage(
    medicationId: string,
    image: (UploadApiResponse | UploadApiErrorResponse)[]
  ) {
    try {
      // const medication = await this.getMedicationByMedicationId(medicationId);
      const medication = await Medications.findOne({
        where: {
          medicationId,
        },
      });
      if (!medication)
        throw new BaseError(
          'error from the medication service',
          'No loaded medication found for that medication id. Please use a different medication id.',
          'getMedicationByMedicationId',
          404
        );
      let imageList = [];
      if (medication.image) {
        imageList = JSON.parse(medication.image);
        imageList.push(...image);
      } else imageList.push(...image);
      await medication.update({
        image: JSON.stringify(imageList),
      });
    } catch (error) {
      throw new BaseError('error from the medication service', error, 'updateMedicationImage', 500);
    }
  }
};

export default new MedicationService();
