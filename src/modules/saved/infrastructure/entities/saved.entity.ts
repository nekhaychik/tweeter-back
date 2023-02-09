import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SavedEntity {
  @PrimaryColumn({ type: 'varchar', length: 150, nullable: false })
  public userId: string;

  @PrimaryColumn({ type: 'varchar', length: 150, nullable: false })
  public tweetId: string;

  @Column({ type: 'timestamp', nullable: false })
  public createdAt: Date;
}
