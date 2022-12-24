import create from './create';
import loadMedication from './loadMedication';
import getAvailableDrones from './getAvailableDrones';
import getMedicationBySerialNumber from './getMedicationBySerialNumber';
import checkBatteryLevel from './checkBatteryLevel';
import audit from './audit';

const droneController = {
  create,
  loadMedication,
  getAvailableDrones,
  getMedicationBySerialNumber,
  checkBatteryLevel,
  audit,
};

export default droneController;
