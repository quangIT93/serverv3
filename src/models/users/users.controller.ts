import {
  BadRequestException,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { Users } from 'src/common/decorators/users/users.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseInterceptors(ClassSerializerInterceptor)
  async get(@Users() user: User): Promise<User> {
    return user;
  }

  @Get('test')
  @UseInterceptors(ClassSerializerInterceptor)
  async test(): Promise<any> {
    return this.userService.findByEmail('phanthang052@gmail.com');
  }

  @Put('type')
  @UseGuards(AuthGuard)
  async update(@Req() req: CustomRequest, type?: number) {
    try {
      const id = req.user?.id;

      if (!id) {
        throw new BadRequestException('User not found');
      }

      await this.userService.updateTypeUser(id, type);

      return {
        statusCode: HttpStatus.OK,
        message: 'Update type successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }
}
