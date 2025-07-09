import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  @IsPublic()
  async postCreateMailData(@Body() { email }: { email: string }) {
    await this.mailService.createAuthEmail(email);
    return email;
  }

  @Post('verify')
  @IsPublic()
  async postAuthNumberVerify(
    @Body() { email, verificationCode }: { email: string; verificationCode: string },
  ) {
    await this.mailService.authNumberAndEmailVerify(email, verificationCode);
    return { message: '이메일 인증이 확인되었습니다.' };
  }

  // @Get('delete')
  // @IsPublic()
  // async test() {
  //   await this.mailService.deleteAllDB();
  // }

  // @Get()
  // @IsPublic()
  // async getDB() {
  //   return this.mailService.getDb();
  // }
}
