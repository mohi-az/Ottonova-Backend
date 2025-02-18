import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { LandmarkServices } from './landmark.service';
import { Prisma } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';

@Controller('landmark')
export class LandmarkController {
    constructor(private readonly landmarkServices: LandmarkServices) { }

    @ApiOperation({ summary: 'fetch all landmarks' })
    @Get()
    async landmark() {
        return this.landmarkServices.getAllLandmarks();
    }

    @ApiOperation({ summary: 'fetch a landmark by id' })
    @Get(':id')
    async landmarkById(@Param('id') id: string) {
        return this.landmarkServices.getLandmarkById(+id);
    }

    @ApiOperation({ summary: 'insert landmark' })
    @Post()
    async createLandmark(@Body() data: Prisma.LandmarkCreateInput & { cityId: number, countryName: string; cityName: string }) {
        return this.landmarkServices.createLandmark(data);
    }

    @ApiOperation({ summary: 'update landmark' })
    @Patch(':id')
    async updateLandmark(@Param('id') id: string, @Body() data: Partial<Prisma.LandmarkUpdateInput>
        & { cityId: number, countryName: string; cityName: string }) {
        const { cityId, countryName, cityName, ...updateData } = data;
        return this.landmarkServices.updateLandmark({ data: updateData, where: { id: +id }, cityId, countryName, cityName });
    }

    @ApiOperation({ summary: 'logical delete by landmark id' })
    @Delete(':id')
    async deleteLandmark(@Param('id') id: string) {
        return this.landmarkServices.deleteLandmark(+id)
    }
}
