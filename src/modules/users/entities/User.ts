import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Account } from '@modules/accounts/entities/Account';
import { StatementTags } from '@modules/statement-tag/entities/StatementTag';
import { Status } from '@modules/status/entities/Status';
import { Statement } from '../../statements/entities/Statement';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status_id: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @OneToMany(() => Statement, (statement) => statement.user)
  statement: Statement[];

  @OneToMany(() => Account, (account) => account.user)
  account: Account[];

  @OneToMany(() => StatementTags, (statementTag) => statementTag.user)
  statement_tag: StatementTags[];

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
