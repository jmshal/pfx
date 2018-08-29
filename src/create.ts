import * as path from 'path';
import { tempFolder } from './fs/tempFolder';
import { writeFile } from './fs/writeFile';
import { readFile } from './fs/readFile';
import { execScript } from './cmd/execScript';

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
  return tempFolder(async (tempPath) => {
    const certPath = path.resolve(tempPath, 'cert.crt');
    const privateKeyPath = path.resolve(tempPath, 'private.pem');
    const outPath = path.resolve(tempPath, 'output.pfx');

    await writeFile(certPath, cert);
    await writeFile(privateKeyPath, privateKey);

    await execScript(`
      openssl pkcs12 \\
        -export \\
        -out ${outPath} \\
        -inkey ${privateKeyPath} \\
        -in ${certPath} \\
        -password "pass:${password}"
    `);

    return await readFile(outPath);
  });
}

export {
  create,
};
