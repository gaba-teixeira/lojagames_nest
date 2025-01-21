import { forwardRef, Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';
import { UsuarioModule } from '../usuarios/usuario.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports:[forwardRef(() => UsuarioModule), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '1h'}
})], 
    controllers: [AuthController],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    exports:[Bcrypt],
})
export class AuthModule {};