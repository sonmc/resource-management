import * as redisStore from 'cache-manager-redis-store';
export const redisOptions = {
  isGlobal: true,
  memory: redisStore,
  host: 'localhost', //default host
  port: 6379, //default port
  ttl: 2000, //ttl
};
