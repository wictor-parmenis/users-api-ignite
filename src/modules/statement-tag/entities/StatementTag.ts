import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@modules/users/entities/User';

@Entity('statement_tags')
export class StatementTags {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.statement_tag)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // TODO: add URL ICON column

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
