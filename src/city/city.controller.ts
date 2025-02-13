import { Get, Post, Controller, Param, Body, Patch, Delete } from '@nestjs/common';
import { CityService } from './city.service';
import { City, Prisma } from '@prisma/client';

@Controller('city')
export class CityController {
    constructor(private readonly cityService: CityService) { }
    @Get()
    async cities(): Promise<City[]> {
        return this.cityService.getAllCities();
    }
    @Get(':id')
    async cityById(@Param('id') id: string): Promise<City | null> {
        return this.cityService.getCityById(+id);
    }
    @Post()
    async createCity(@Body() userData: Prisma.CityCreateInput): Promise<City> {
        return this.cityService.createCity(userData)
    }
    @Patch(':id')
    async updateCity(@Param('id') id: string, @Body() cityData: Partial<Prisma.CityUpdateInput>): Promise<City> {
        return this.cityService.updateCity({ where: { id: +id }, data: cityData })
    }
    @Delete(':id')
    async deleteCity(@Param('id') id: string): Promise<City> {
        return this.cityService.deleteCity(+id)
    }
}