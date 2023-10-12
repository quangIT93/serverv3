import { UserService } from 'src/models/users/users.service';
import { JwtAccessTokenService } from 'src/services/jwt/atk.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
// import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { SignInEmailDto } from "./dto/auth.dto";
// import { MailService } from "src/services/mail/mail.service";
// import { BullMailService } from "src/services/bull/bull-mail.service";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        // private authService: AuthService,
        // private bullMailService: BullMailService,
        private usersService: UserService,
        private readonly jwtAccessTokenService: JwtAccessTokenService,
    ) { }
    
    @HttpCode(HttpStatus.OK)
    @Post('email')
    async signIn(@Body() signInEmail: SignInEmailDto): Promise<any> {
        // this.bullMailService.sendMail(signInEmail.email || '');

        const user = await this.usersService.findByEmail(signInEmail.email);

        if (!user) {
            return {
                message: 'User not found',
            };
        }

        return this.jwtAccessTokenService.generateAccessToken({ 
            id: user.id,
            role: user.role || 0,
         });
    }
}