import createDrone from "./createDrone";
import loadDroneWithMedication from "./loadDroneWithMedication";
import getAvailableDrones from "./getAvailableDrones";
import getMedicationByDroneSerialNumber from "./getMedicationByDroneSerialNumber";

const droneController = {
  createDrone,
  loadDroneWithMedication,
  getAvailableDrones,
  getMedicationByDroneSerialNumber,
};

export default droneController;