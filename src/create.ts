import * as path from 'path';
import * as fs from 'fs-extra';
import { temp } from './temp';
import { exec } from './exec';

interface CreatePfxOptions {
  cert: Buffer | string;
  privateKey: Buffer | string;
  password?: string;
}

function create({
  cert,
  privateKey,
  password = '', // no password by default
}: CreatePfxOptions) {
  return temp(async (tempPath) => {
    const certPath = path.resolve(tempPath, 'cert.crt');
    const privateKeyPath = path.resolve(tempPath, 'private.pem');
    const outPath = path.resolve(tempPath, 'output.pfx');

    await fs.writeFile(certPath, cert);
    await fs.writeFile(privateKeyPath, privateKey);

    await exec(`
      openssl pkcs12 \\
        -export \\
        -out ${outPath} \\
        -inkey ${privateKeyPath} \\
        -in ${certPath} \\
        -password "pass:${password}"
    `);

    return await fs.readFile(outPath);
  });
}

export {
  create,
};
