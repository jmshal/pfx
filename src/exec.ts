import * as child_process from 'child_process';

function exec(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    child_process.exec(script, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

export {
  exec,
};
