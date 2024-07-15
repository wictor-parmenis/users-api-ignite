require('dotenv').config();

const { STAGE } = process.env;

const isLocal = STAGE === 'local';

export { STAGE, isLocal };
