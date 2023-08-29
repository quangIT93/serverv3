import { BadRequestException, Body, Controller, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/authentication/auth.guard";
import { RoleGuard } from "src/authentication/role.guard";
import { Roles } from "src/authentication/roles.decorator";
import { Role } from "src/common/enum";
import { AdminService } from "./admin.service";
import { AdsMailOptionsDto } from "./dto/ads-mail-options.dto";
import { CustomRequest } from "src/common/interfaces/customRequest.interface";


@Controller('admin')
export class AdminController {

    constructor(
        private readonly adminService: AdminService
    ) { }

    @Roles(Role.ADMIN, Role.WORKER)
    @UseGuards(AuthGuard, RoleGuard)
    @Post('send-mail')
    async sendMail(@Body() data: AdsMailOptionsDto[],
     @Req() req: CustomRequest) {
        try {
            if (!req.user) {
                throw new UnauthorizedException('Unauthorized');
            }
            
            // max 10 mail in 1 request
            if (data.length > 10) {
                throw new BadRequestException('Max 10 mail in 1 request');
            }
            
            return this.adminService.sendAdsMail(data, req.user.id);
        } catch (error) {
            throw new BadRequestException('Send mail failed');
        }
    }
}