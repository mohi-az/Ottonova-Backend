import { Module } from '@nestjs/common';
import { CityModule } from './city/city.module';
import { LandmarkModule } from './landmark/landmark.module';

@Module({
  imports: [CityModule,LandmarkModule]
})
export class AppModule {}
