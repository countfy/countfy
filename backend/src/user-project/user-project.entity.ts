import { User } from 'src/user/users.entity';
import { Project } from 'src/project/project.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserProject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['owner', 'member'], default: 'member' })
  role: string;

  @OneToOne(() => User)
  @JoinTable()
  user: User;

  @OneToOne(() => Project)
  @JoinTable()
  project: Project;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
