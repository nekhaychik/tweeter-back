import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TweetEntity {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  public createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  public updatedAt: Date;

  @Column({ type: 'boolean', nullable: false })
  public isComment: boolean;

  @Column({ type: 'text', nullable: true })
  public text?: string;

  @Column({ type: 'json', nullable: true })
  public imagesURLs?: string;

  @Column({ nullable: false })
  public authorId: string;

  @Column({ nullable: true })
  public parentRecordAuthorId?: string;

  @Column({ nullable: true })
  public parentRecordId?: string;
}
