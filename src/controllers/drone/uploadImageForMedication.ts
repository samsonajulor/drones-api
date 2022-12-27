import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Request, Response } from 'express';
import { UploadsRequest } from '../../@types';
import { Toolbox, HttpStatusCode, BaseError } from '../../utils';
import { MedicationService } from '../../service';

const { apiResponse, RESPONSE, uploadToCloudinary } = Toolbox;
const { updateMedicationImage } = MedicationService;

async function uploadImageForMedication(req: Request, res: Response) {
  try {
    const { medicationId } = req.query;
    const files = (req as UploadsRequest).files;
    console.log(files);
    const result: Array<UploadApiResponse | UploadApiErrorResponse> = [];

    for await (const file of files) {
      result.push(await uploadToCloudinary(file));
    }

    await updateMedicationImage(
      medicationId as string,
      result.map((data) => data.url)
    );

    return apiResponse(
      'uploads',
      res,
      RESPONSE.success,
      HttpStatusCode.OK,
      JSON.stringify(result.map((data) => data.url)),
      'file uploaded successfully'
    );
  } catch (error) {
    const httpCode =
      error instanceof BaseError ? error.httpCode : HttpStatusCode.INTERNAL_SERVER_ERROR;
    const response =
      error instanceof BaseError
        ? error.message || error
        : 'Some error occurred. Please contact support';
    return apiResponse(
      'uploadImageForMedication',
      res,
      RESPONSE.fail,
      httpCode,
      JSON.stringify(response, Object.getOwnPropertyNames(response)),
      'uploads api error'
    );
  }
}

export default uploadImageForMedication;
