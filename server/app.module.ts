import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';


const getMongoUrl = () => {
  if (process.env.MONGOUSER && process.env.MONGOPASSWORD) {
    return `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@ds249839.mlab.com:49839/angular-nest-chat-app`;
  } else {
    return 'mongodb://localhost:27017/nest';
  }
};
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../dist'),
    }),
    MongooseModule.forRoot(getMongoUrl()),
    UsersModule,
    RoomsModule,
    AuthModule
  ]
})
export class AppModule {}
