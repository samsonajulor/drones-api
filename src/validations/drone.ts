import joi from 'joi';
import { DroneType, GenericType } from '../@types';
import { BaseError } from '../utils';

const drone = {
  async updateDrone(payload: DroneType) {
    const schema = joi.object({
      serialNumber: joi
        .string()
        .max(100)
        .required()
        .label('serialNumber is required. length must be <= 100 characters.'),
      model: joi
        .string()
        .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
        .required()
        .label(
          'model is required. List of valid models: Lightweight, Middleweight, Cruiserweight, Heavyweight'
        ),
      weight: joi
        .number()
        .integer()
        .positive()
        .less(501)
        .required()
        .label('weight is required. Should be a positive integer <= 500'),
      battery: joi
        .number()
        .integer()
        .positive()
        .less(101)
        .required()
        .label('battery is required. Should be a positive integer <= 100.'),
      state: joi
        .string()
        .valid('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')
        .required()
        .label(
          'state is required. List of valid states: IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING'
        ),
    });
    const { error }: GenericType = schema.validate(payload);
    if (error)
      throw new BaseError(
        'error from the drone validations',
        error.details[0].context.label,
        'updateDrone',
        400
      );
    return true;
  },
  async addNewDrone(payload: DroneType) {
    const schema = joi.object({
      model: joi
        .string()
        .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
        .required()
        .label(
          'model is required. List of valid models: Lightweight, Middleweight, Cruiserweight, Heavyweight'
        ),
      battery: joi
        .number()
        .integer()
        .positive()
        .less(101)
        .required()
        .label('battery is required. Should be a positive integer <= 100.'),
    });
    const { error }: GenericType = schema.validate(payload);
    if (error)
      throw new BaseError(
        'error from the drone validations',
        error.details[0].context.label,
        'addNewDrone',
        400
      );
    return true;
  },
};

export default drone;
