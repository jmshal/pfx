# @jmshal/pfx

This module is simply a wrapper around `openssl`. 

It was created for one reason; to output a `.pfx` file containing the cert and key provided by `greenlock` (a Let's Encrypt module), so it could be used for an Azure Function App backed by Key Vault.

I intend to add some more functionality, like extracting the cert and key from a `.pfx` file. This is handy when you need to add a password to a pfx that is stored in Azure Key Vault (when purchasing it via their Portal).

## Example usage

```js
import { create } from '@jmshal/pfx';

const pfx = await create({
  cert: `-----BEGIN CERTIFICATE-----\nMIIF4jCCBMqgAwIBA...`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----\nMIIEowI...`,
  password: 'p@ssw0rd', // optional
});

console.log(pfx.toString('base64')); // MIIMIQIBAzCCC+c...
```
