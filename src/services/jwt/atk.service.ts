
/**
 * @description JWT Access Token Service
 * @todo
 * - Create a Access token service that will handle the Access token logic.
 * - The Access token service will have a single method that will generate a new access token.
 * 
 * @class
 */

import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/common/interfaces/jwtPayload.interface";

@Injectable()
export class JwtAccessTokenService {
    constructor(
        private readonly jwtATKService: JwtService,
    ) {}

    async generateAccessToken(payload: JwtPayload) {
        return this.jwtATKService.signAsync(payload);
    }
    
    async parseAccessToken(token: string) {
        return this.jwtATKService.decode(token);
    }

    async validateToken(auth: string): Promise<JwtPayload> {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new UnauthorizedException();
        }
        const token = auth.split(' ')[1];
        try {
            await this.jwtATKService.verifyAsync(token)
            return this.jwtATKService.decode(token) as JwtPayload;
        } catch (error) {
            switch (typeof error) {
                case UnauthorizedException.name:
                    throw new UnauthorizedException();
                case ForbiddenException.name:
                    throw new ForbiddenException();
                default:
                    throw new Error('Invalid token');
            }

        }
    }
}