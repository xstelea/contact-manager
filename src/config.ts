export enum Environment {
  Dev = 'develop',
  Prod = 'production',
  Sandbox = 'sandbox',
}

export const config = {
  env: process.env.REACT_APP_ENV,
};
