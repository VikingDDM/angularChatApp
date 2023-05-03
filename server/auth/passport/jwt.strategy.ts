import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends Strategy {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: 'secret',
      },
      async (req, payload, next) => await this.verify(req, payload, next)
    );
    passport.use(this);
  }

  public async verify(req, payload, done): Promise<void> {
    const isValid: boolean = await this.authService.validateLogin(payload);
    if (!isValid) {
      done('Unauthorized', false);
      return;
    }
    done(null, payload);
  }
}
