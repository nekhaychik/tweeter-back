import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public _id: string;

  @Column({ unique: true, type: 'varchar', length: 150, nullable: false })
  public email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  public username: string;

  @Column({ type: 'varchar', nullable: true })
  public avatarURL?: string;

  @Column({ type: 'text', nullable: true })
  public description?: string;

  @Column({ type: 'varchar', nullable: false })
  public hashedPassword: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  public emailCode: string;

  @Column({ type: 'varchar', nullable: true })
  public currentHashedRefreshToken?: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  public isVerified: boolean;

  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  public updatedAt: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  public isEdited: boolean;
}
