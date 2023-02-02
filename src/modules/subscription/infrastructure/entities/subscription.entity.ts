import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SubscriptionEntity {
  @PrimaryColumn({ type: 'varchar', length: 150, nullable: false })
  public subscriberId: string;

  @PrimaryColumn({ type: 'varchar', length: 150, nullable: false })
  public userId: string;
}
