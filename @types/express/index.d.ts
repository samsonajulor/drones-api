declare global {
  namespace Express {
    interface Request {
      array: any;
    }
  }
}
