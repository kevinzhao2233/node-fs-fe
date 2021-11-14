import { InjectionKey } from '@vue/runtime-core';
import { IFile } from './types';

export const FileKey: InjectionKey<IFile[]> = Symbol('file');
