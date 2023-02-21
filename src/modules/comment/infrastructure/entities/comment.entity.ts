import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  public userId: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  public tweetId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public text?: string;

  @Column({ type: 'json', nullable: true })
  public imagesURLs: string;

  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;

  @Column({ type: 'boolean', default: false, nullable: false })
  public isUpdated: boolean;
}
