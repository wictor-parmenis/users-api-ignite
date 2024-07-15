import { titlesCaches } from '@config/titlesCaches';
import { NextFunction, Request, Response } from 'express';
import { redisPreConfigured } from '../../../../cache-mgmt/cacheMgmtConfig';

export const checkCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { USER_BALANCE } = titlesCaches;
  const cachedData = await redisPreConfigured.get(USER_BALANCE);

  if (cachedData) {
    res.send(JSON.parse(cachedData));
  } else {
    next();
  }
};
