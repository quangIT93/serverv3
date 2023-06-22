import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "./entities/user.entity";
import { Users } from "src/common/decorators/users/users.decorator";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController { 
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @UseInterceptors(ClassSerializerInterceptor)
    async get(@Users() user: User): Promise<User> {
        return user;
    }

    @Get("test")
    @UseInterceptors(ClassSerializerInterceptor)
    async test(): Promise<any> {
        return this.userService.findByEmail("phanthang052@gmail.com");
    }

}