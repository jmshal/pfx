import * as fs from 'fs';

function writeFile(path: string, content: any, encoding = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, { encoding }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export {
  writeFile,
};
