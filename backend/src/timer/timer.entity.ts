import { Project } from 'src/project/project.entity';
import { User } from 'src/user/users.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PK id uuid  NOT NULL,
//user_id uuid  NOT NULL,
//project_id uuid  NOT NULL,
//start_time timestamp NOT NULL,
//end_time timestamp,
//CONSTRAINT FK_timer_user_id FOREIGN KEY (user_id) REFERENCES user (id),
//CONSTRAINT FK_timer_project_id FOREIGN KEY (project_id) REFERENCES project (id)

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
