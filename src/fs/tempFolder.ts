import { dir } from 'tmp';
import { remove } from 'fs-extra';

function tempFolder(handler: (path: string) => Promise<any>): Promise<any> {
  return new Promise((resolve, reject) => {
    dir((err, tempPath) => {
      if (err) {
        reject(err);
      } else {
        Promise.resolve(handler(tempPath))
          .then(resolve)
          .catch(reject)
          .then(() => {
            remove(tempPath);
          });
      }
    });
  });
}

export {
  tempFolder,
};
