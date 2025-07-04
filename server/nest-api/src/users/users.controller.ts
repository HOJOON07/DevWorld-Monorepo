import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from 'src/common/decorator/is-public.decorator';
import { QueryRunner } from 'src/common/decorator/query-runner.decorator';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';
import { QueryRunner as QR } from 'typeorm';
import { RolesEnum } from './const/roles.const';
import { Roles } from './decorator/roles.decorator';
import { User } from './decorator/user.decorator';
import { DuplicateDevNameDto } from './dto/duplicate-devname.dto';
import { UserProfileEditDto } from './dto/user-profiles-edit.dto';
import { UserModel } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Delete('delete')
  deleteUser(@Body('email') email: string) {
    return this.usersService.deleteUser(email);
  }

  @Get('myinfo')
  getReturnMyInfo(@User('id') userId: number, @Request() req) {
    return this.usersService.getMyInfo(userId);
  }

  @Get('info')
  @IsPublic()
  getReturnUserInfo(@Query('devName') devName: string) {
    return this.usersService.getUserInfo(devName);
  }

  @Post('duplicate')
  postDuplicateDevName(@User('id') id: number, @Body() duplicateDevNameDto: DuplicateDevNameDto) {
    return this.usersService.duplicateGetDevName(id, duplicateDevNameDto);
  }

  @Patch('edit/:userId')
  patchtUserProfilesEdit(@User('id') id: number, @Body() userProfileEditDto: UserProfileEditDto) {
    return this.usersService.userProfileEdit(id, userProfileEditDto);
  }

  @Patch('readme/:id')
  patchUserReadMe(@User('id') id: number, @Body('readme') readme: string) {
    return this.usersService.UserReadmeEdit(id, readme);
  }

  @Get('overview')
  @IsPublic()
  getUserOverview(@Query('devName') devName: string) {
    return this.usersService.getUserOverview(devName);
  }

  @Post('follow/:id')
  async postFollowUser(@User() user: UserModel, @Param('id', ParseIntPipe) followeeId: number) {
    await this.usersService.followUser(user.id, followeeId);
  }

  @Get('follow/me')
  async getFollow(
    @User('id') userId: number,
    @Query('includeNotConfirmed', new DefaultValuePipe(false), ParseBoolPipe)
    includeNotConfirmed: boolean,
  ) {
    return this.usersService.getFollowers(userId, includeNotConfirmed);
  }

  @Patch('follow/:id/confirm')
  @UseInterceptors(TransactionInterceptor)
  async patchFollowConfirm(
    @User() user: UserModel,
    @Param('id', ParseIntPipe) followerId: number,
    @QueryRunner() qr: QR,
  ) {
    this.usersService.confirmFollow(followerId, user.id, qr);

    await this.usersService.incrementFollowerCount(user.id, 'followerCount', 1, qr);

    await this.usersService.incrementFollowerCount(followerId, 'followeeCount', 1, qr);
    return true;
  }

  @Delete('follow/:id')
  @UseInterceptors(TransactionInterceptor)
  async deleteFollow(
    @User() user: UserModel,
    @Param('id', ParseIntPipe) followeeId: number,
    @QueryRunner() qr: QR,
  ) {
    await this.usersService.deleteFollow(user.id, followeeId, qr);
    await this.usersService.decrementFollowerCount(user.id, 'followerCount', 1, qr);
    await this.usersService.decrementFollowerCount(followeeId, 'followeeCount', 1, qr);
    return true;
  }
}
