import * as fs from 'fs';

function readFile(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(contents);
      }
    });
  });
}

export {
  readFile,
};
