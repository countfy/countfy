import { Timer } from 'src/timer/timer.entity';
import { User } from 'src/user/users.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
/*
PK id uuid  NOT NULL,
name varchar(255) NOT NULL,
description varchar(255) NOT NULL,
created_at timestamp NOT NULL,
updated_at timestamp NOT NULL
*/

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
  description: string;

  @OneToMany(() => Timer, (timer) => timer.project)
  timers: Timer[];

  @ManyToMany(() => User, (user) => user.projects)
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
