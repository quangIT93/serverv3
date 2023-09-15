import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentication/auth.guard';
import { CustomRequest } from 'src/common/interfaces/customRequest.interface';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Get('me')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async get(@Users() user: User): Promise<User> {
  //   return user;
  // }

  // @Get('test')
  // @UseInterceptors(ClassSerializerInterceptor)
  // async test(): Promise<any> {
  //   return this.userService.findByEmail('phanthang052@gmail.com');
  // }
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'integer',
          example: 1,
        },
      },
    },
  })
  @Put('type')
  @UseGuards(AuthGuard)
  async update(
    @Req() req: CustomRequest,
    @Body('type', ParseIntPipe) type: number,
  ): Promise<any> {
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
