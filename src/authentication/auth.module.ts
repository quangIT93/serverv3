import { Module } from "@nestjs/common";
import { UserModule } from "src/models/users/users.module";
import { AuthService } from "./auth.service";
// import { AuthController } from "./auth.controller";
import { BullMailService } from "src/services/bull/bull-mail.service";
import { MailService } from "src/services/mail/mail.service";
import { QueueModule } from "src/providers/queue/provider.module";
// import { JwtAccessTokenService } from "src/services/jwt/atk.service";
import { JwtAccessTokenServiceModule } from "src/providers/jwt/atk.provider.module";
// import { BullMailService } from "src/services/bull/bull-mail.service";


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
    // controllers: [AuthController]
})

export class AuthModule { }