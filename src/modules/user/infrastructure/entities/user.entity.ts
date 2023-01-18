import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public _id: number;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ nullable: false })
  public hashedPassword: string;

  @Column({ nullable: false })
  public emailCode: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @Column({ nullable: false, default: false })
  public isVerified: boolean;
}
