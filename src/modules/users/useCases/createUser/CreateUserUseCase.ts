import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { CreateUserError } from './CreateUserError';

import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserServiceParamsDTO } from './ICreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUserServiceParamsDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new CreateUserError();
    }

    const passwordHash = await hash(password, 8);

    const ACTIVED_USER_STATUS = 1;
    const user = await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      status_id: ACTIVED_USER_STATUS,
    });

    return user;
  }
}
