export interface IFile {
  name: string;
  size: number;
  type: string; // MIME 类型
  uploadProcess: number,
  md5Process: number,
  md5: string,
  state: 'chosen' | 'processingMd5' | 'uploading' | 'uploadComplete',
  relativePath?: string;
  source: File,
  isFolder: boolean;
}

// 再想想类型，感觉这样并不是很好

export interface IFolder {
  name: string;
  isFolder: boolean;
  size: number;
  files: IFile[]
}
