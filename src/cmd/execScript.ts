import { exec } from 'child_process';

function execScript(script: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(script, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr));
      } else {
        resolve(stdout);
      }
    });
  });
}

export {
  execScript,
};
