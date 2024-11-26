import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Column('text')
  token: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  expiresAt: Date;
}
