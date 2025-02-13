import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.modul';
import { LandmarkModul } from './landmark/landmark.modul';

@Module({
  imports: [CityModule,LandmarkModul],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
