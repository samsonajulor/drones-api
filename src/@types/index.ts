export const applicationJsonType = 'application/json';
export const applicationXmlType = 'application/xml';

export type APIResponseType<T = any> = {
  status: string;
  responseCode: string;
  responseMessage: string;
  details: T;
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  ALREADY_EXISTS = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type GenericType = {
  [x: string]: any;
};

export type DroneType = {
  serialNumber: string;
  model: string;
  weight: number;
  battery: number;
  state: string;
};

export type MedicationType = {
  name: string;
  weight: number;
  code: string;
  image: string;
};

export type GetMedicationType = {
  droneId: string;
};