import { Column, Entity, PrimaryColumn } from 'typeorm';
import { uuid } from 'uuidv4';

@Entity()
export class TweetEntity {
  @PrimaryColumn({ type: 'uuid', nullable: false, default: uuid })
  public _id: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: new Date().toUTCString(),
  })
  public createdAt: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: new Date().toUTCString(),
  })
  public updatedAt: string;

  @Column({ type: 'boolean', nullable: false })
  public isComment: boolean;

  @Column({ type: 'text', nullable: true })
  public text?: string;

  @Column({ type: 'array', nullable: true })
  public imagesURLs?: string[];

  @Column({ nullable: false })
  public authorId: string;

  @Column({ nullable: true })
  public parentRecordAuthorId?: string;

  @Column({ nullable: true })
  public parentRecordId?: string;
}