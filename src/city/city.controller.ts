import { Get, Post, Controller, Param, Body, Patch, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { City, Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }

    @ApiOperation({summary:'fetch all cities'})
    @Get()
    async cities(): Promise<City[]> {
        return this.cityService.getAllCities();
    }

    @ApiOperation({summary:'fetch a city by Id'})
    @Get(':id')
    async cityById(@Param('id') id: string): Promise<City | null> {
        return this.cityService.getCityById(+id);
    }

    @ApiOperation({summary:'insert new city (it restores a city if it has already been deleted)'})
    @Post()
    async createCity(@Body() userData: Prisma.CityCreateInput): Promise<City> {
        return this.cityService.createCity(userData)
    }

    @ApiOperation({summary:'update city by city Id'})
    @Patch(':id')
    async updateCity(@Param('id') id: string, @Body() cityData: Partial<Prisma.CityUpdateInput>): Promise<City> {
        return this.cityService.updateCity({ where: { id: +id }, data: cityData })
    }

    @ApiOperation({summary:'logical delete by city Id'})
    @Delete(':id')
    async deleteCity(@Param('id') id: string): Promise<City> {
        return this.cityService.deleteCity(+id)
    }
}