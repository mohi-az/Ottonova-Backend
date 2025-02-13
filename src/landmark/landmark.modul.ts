import { Module } from "@nestjs/common";
import { LandmarkController } from "./landmark.controller";
import { LandmarkServices } from "./landmark.service";
import { DatabaseService } from "src/database.service";

@Module({
        controllers: [LandmarkController],
        providers: [LandmarkServices, DatabaseService]
    })
export class LandmarkModul { }