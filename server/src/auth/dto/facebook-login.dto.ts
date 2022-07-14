
import { IsNotEmpty, IsString } from 'class-validator';

export default class FacebookLoginDto {
  @IsString()
  @IsNotEmpty()
  userID: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}