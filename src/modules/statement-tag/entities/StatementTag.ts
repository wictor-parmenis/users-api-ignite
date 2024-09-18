import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Statement } from '@modules/statements/entities/Statement';
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

  @ManyToMany(() => Statement, (statement) => statement.tags)
  statements: Statement[];

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
