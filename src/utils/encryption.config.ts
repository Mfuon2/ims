// it is recommended to not store encryption keys directly in config files,
// it's better to use an environment variable or to use dotenv in order to load the value
export const DataEncryptionTransformerConfig = {
  key: process.env.ENCRYPTION_KEY,
  algorithm: 'aes-256-gcm',
  ivLength: 16,
};
