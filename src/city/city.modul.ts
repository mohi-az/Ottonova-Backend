import { Module } from "@nestjs/common";
import { CityController } from "./city.controller";
import { CityService } from "./city.service";
import { DatabaseService } from "src/database.service";

@Module({
    controllers: [CityController],
    providers: [CityService, DatabaseService]
})
export class CityModule { }