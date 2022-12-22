import joi from 'joi';
import { DroneType, GenericType, GetMedicationType } from '../@types';

const medication = {
  async addNewMedication(payload: DroneType) {
    const schema = joi.object({
      name: joi
        .string()
        .alphanum()
        .allow('-', '_')
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
        .alphanum()
        .uppercase()
        .allow('_')
        .required()
        .label('code is required, must be alphanumeric, _ is allowed and must be uppercase.'),
    });
    const { error }: GenericType = schema.validate(payload, { abortEarly: false, allowUnknown: true });
    if (error) throw new Error(error.details[0].context.label);
    return true;
  },
  async getMedicationItems(payload: GetMedicationType) {
    const schema = joi.object({
      droneId: joi.string().required().label('droneId is required. must be a valid droneId'),
    });
    const { error }: GenericType = schema.validate(payload, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) throw new Error(error.details[0].context.label);
    return true;
  },
};

export default medication;
