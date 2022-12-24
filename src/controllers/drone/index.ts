import create from './create';
import loadMedication from './loadMedication';
import getAvailableDrones from './getAvailableDrones';
import getMedicationBySerialNumber from './getMedicationBySerialNumber';
import checkBatteryLevel from './checkBatteryLevel';

const droneController = {
  create,
  loadMedication,
  getAvailableDrones,
  getMedicationBySerialNumber,
  checkBatteryLevel,
};

export default droneController;
