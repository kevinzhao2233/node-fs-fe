export interface IFile {
  name: string;
  size: number;
  type: string;
  uploadProcess: number,
  md5Process: number,
  md5: string,
  source: File
}
