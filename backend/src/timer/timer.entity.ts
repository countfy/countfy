import { Project } from 'src/project/project.entity';
import { User } from 'src/user/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Timer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.timers)
  user: User;

  @ManyToOne(() => Project, (project) => project.timers)
  project: Project;

  @Column({ type: 'timestamp', nullable: false })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date;
}
