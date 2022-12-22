import joi from 'joi';
import { DroneType, GenericType } from '../@types';

const drone = {
  async addNewDrone(payload: DroneType) {
    const schema = joi.object({
      model: joi
        .string()
        .valid('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')
        .required()
        .label('model is required. List of valid models: Lightweight, Middleweight, Cruiserweight, Heavyweight'),
      weight: joi
        .number()
        .min(0)
        .max(500)
        .required()
        .label('weight (positive integer <= 500) is required.'),
      battery: joi.number().max(0).min(100).required().label('battery is required.'),
      state: joi
        .string()
        .valid('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')
        .optional()
        .label('state is required. List of valid states: IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING'),
    });
    const { error }: GenericType = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  },
};

export default drone;
