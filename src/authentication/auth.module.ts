import { Module } from "@nestjs/common";
import { UserModule } from "src/models/users/users.module";
import { AuthService } from "./auth.service";
import { BullMailService } from "src/services/bull/bull-mail.service";
import { MailService } from "src/services/mail/mail.service";
import { QueueModule } from "src/providers/queue/provider.module";
import { JwtAccessTokenServiceModule } from "src/providers/jwt/atk.provider.module";
import { AuthController } from "./auth.controller";


@Module({
    imports: [
        UserModule,
        QueueModule,
        JwtAccessTokenServiceModule
    ],
    providers: [
        AuthService, 
        BullMailService, 
        MailService,
        // JwtAccessTokenService
    ],
    controllers: [AuthController]
})

export class AuthModule { }