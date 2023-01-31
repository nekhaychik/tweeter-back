export class RefreshSessionDto {
  public refreshToken: string;
  public userId: string;
  public fingerprint: string;
  public ip: string;
  public expiresIn: string;
  public ua?: string;
}
