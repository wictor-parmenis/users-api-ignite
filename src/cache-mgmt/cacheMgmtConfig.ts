import { isLocal } from '@config/stageStatus';
import Redis from 'ioredis';

const redisPreConfigured = new Redis({
  host: isLocal ? 'localhost' : 'redis',
});

export { redisPreConfigured };
