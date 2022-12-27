import db from '../models';
import { BaseError } from '../utils';
import { AuditType } from '../@types';

const { Audits } = db;

class AuditService {
  async create(auditData: AuditType) {
    try {
      const newAudit = await Audits.create(auditData);
      return newAudit;
    } catch (error) {
      const httpCode = error instanceof BaseError ? error.httpCode : 500;
      throw new BaseError('error from the audit service', error, 'create', httpCode);
    }
  }
};

export default new AuditService();
