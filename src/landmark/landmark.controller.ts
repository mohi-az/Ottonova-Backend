import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { LandmarkServices } from './landmark.service';
import { Prisma } from '@prisma/client';

@Controller('landmark')
export class LandmarkController {
    constructor(private readonly landmarkServices: LandmarkServices) { }
    @Get()
    async landmark() {
        return this.landmarkServices.GetAllLandmard();
    }

    @Get(':id')
    async landmarkById(@Param('id') id: string) {
        return this.landmarkServices.GetLandmarkById(+id);
    }

    @Post()
    async createLandmark(@Body() data: Prisma.LandmarkCreateInput  & { cityId: number }) {
        return this.landmarkServices.CreateLandmark(data);
    }

    @Patch(':id')
    async updateLandmark(@Param('id') id: string, @Body() data: Partial<Prisma.LandmarkUpdateInput>) {
        return this.landmarkServices.UpdateLandmark({ data, where: { id: +id } });
    }

    @Delete(':id')
    async deleteLandmark(@Param('id') id: string) {
        return this.landmarkServices.DeleteLandmark(+id)
    }
}
