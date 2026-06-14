import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export interface UploadOptions {
  onProgress?: (progress: number) => void;
  maxSizeMB?: number; // defaults to 10
  allowedTypes?: string[];
  isPdf?: boolean;
}

export const uploadFileToStorage = async (file: File, path: string, options?: UploadOptions): Promise<string> => {
  const { onProgress, maxSizeMB = 10 } = options || {};
  
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`File is too large. Max size is ${maxSizeMB}MB.`);
  }

  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};

export const uploadJsonToStorage = async (data: any, path: string): Promise<string> => {
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const file = new File([blob], 'article.json', { type: 'application/json' });
  return await uploadFileToStorage(file, path);
};

export const resizeAndConvertToWebP = async (
  file: File,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('Could not get canvas 2d context');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject('Canvas is empty');
              return;
            }
            const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const newFile = new File([blob], newFileName, {
              type: 'image/webp',
              lastModified: Date.now(),
            });
            resolve(newFile);
          },
          'image/webp',
          quality
        );
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
