import { BaseError } from '../../utils';
import { AuditService, DroneService, MedicationService } from '../../service';
import { AuditType, MedicationType, DroneType } from '../../@types/index';
import { logger } from '../../config';

async function audit() {
  try {
    const drones = await DroneService.getAll();
    await Promise.all(
      drones.map(async (drone: DroneType) => {
        const medications = await MedicationService.getMedicationBySerialNumber(drone.serialNumber);
        const medicationsString = medications
          .map((medication: MedicationType) => medication.medicationId)
          .join(', ');
        const auditData = {
          serialNumber: drone.serialNumber,
          model: drone.model,
          weight: drone.weight,
          battery: drone.battery,
          state: drone.state,
          medications: medicationsString,
        };
        await AuditService.create(auditData as AuditType);
      })
    );
    logger('audit', 'audit created');
  } catch (error) {
    const data =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please check the logs';
    const response =
      typeof data === 'string' ? data : JSON.stringify(data, Object.getOwnPropertyNames(data));
    logger('audit', response);

    /**create a log without the medication data */
    const drones = await DroneService.getAll();
    await Promise.all(
      drones.map(async (drone: DroneType) => {
        const auditData = {
          serialNumber: drone.serialNumber,
          model: drone.model,
          weight: drone.weight,
          battery: drone.battery,
          state: drone.state,
          medications: 'no medications have been added at the time of logging this drone.',
        };
        await AuditService.create(auditData as AuditType);
      })
    );
    logger('audit', 'audit created with errors');
  }
}
export default audit;
