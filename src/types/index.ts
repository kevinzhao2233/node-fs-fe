type State = 'chosen' | 'processingMd5' | 'prepareForUpload' | 'uploading' | 'uploadComplete'

export interface IFile {
  id: string;
  name: string;
  size: number;
  type: string; // MIME 类型
  uploadProcess: number,
  md5Process: number,
  md5: string,
  state: State,
  source: File,
  isFolder: false;
  relativePath?: string;
  folderId?:string;
}

// 再想想类型，感觉这样并不是很好
export interface IFolder {
  id: string;
  name: string;
  isFolder: true;
  size: number;
  state: State,
  files: IFile[]
}
