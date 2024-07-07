import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cachedData = await redis.get('user-balance-cache');

  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    next();
  }
};
