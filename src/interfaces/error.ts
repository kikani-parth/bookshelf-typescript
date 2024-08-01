export interface CustomError {
  message?: string;
  [key: string]: any; // Index signature to allow other properties
}
