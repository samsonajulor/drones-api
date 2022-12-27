import joi from 'joi';
import { DroneType, GenericType, GetMedicationType } from '../@types';
import { BaseError } from '../utils';

const medication = {
  async addNewMedication(payload: DroneType) {
    const schema = joi.object({
      name: joi
        .string()
        .regex(/^[a-zA-Z0-9 _-]+$/)
        .min(2)
        .max(100)
        .required()
        .label(
          'name is required. length must be between 2 and 100 characters, alphanumeric, - and _ are allowed.'
        ),
      weight: joi
        .number()
        .min(0)
        .max(500)
        .required()
        .label('weight is required. must be a positive integer <= 500.'),
      code: joi
        .string()
        .regex(/^[A-Z0-9 _]+$/)
        .required()
        .label('code is required, must be alphanumeric, _ is allowed and must be uppercase.'),
    });
    const { error }: GenericType = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error)
      throw new BaseError(
        'error from the medication validations',
        error.details[0].context.label,
        'addNewMedication',
        400
      );
    return true;
  },
  async getMedication(payload: GetMedicationType) {
    const schema = joi.object({
      medicationId: joi
        .string()
        .required()
        .label('medicationId is required. must be a valid medicationId'),
    });
    const { error }: GenericType = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error)
      throw new BaseError(
        'error from the medication validations',
        error.details[0].context.label,
        'getMedicationItems',
        400
      );
    return true;
  },
};

export default medication;
