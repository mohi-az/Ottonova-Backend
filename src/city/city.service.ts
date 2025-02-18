import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { City, Landmark, Prisma } from "@prisma/client";
import { DatabaseService } from "src/database.service";
@Injectable()
export class CityService {
    constructor(private databaseService: DatabaseService) { }
    async getAllCities(): Promise<(City & { landmarks: Landmark[] })[]> {
        try {
            return this.databaseService.city.findMany({
                where: { isDeleted: false },
                include: { landmarks: { where: { isDeleted: false } } },
                orderBy: {
                    id: "desc"
                }
            });
        }
        catch (error) {
            throw new HttpException(`Failed to get a cities: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCityById(cityId: number): Promise<(City & { landmarks: Landmark[] }) | null> {
        try {
            return this.databaseService.city.findUnique({
                where: {id: cityId,isDeleted: false},
                include: { landmarks: true }
            });
        }
        catch (error) {
            console.error("Error fetching cities:", error);
            throw new HttpException(`Failed to get a city: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCity(data: Prisma.CityCreateInput): Promise<City> {
        try {
            const existCity = await this.databaseService.city.findFirst({ where: { id: data.id, isDeleted: true } })
            if (existCity)
                // Restore and update a city if previously deleted.
                return this.databaseService.city.update({ where: { id: data.id }, data: { ...data, isDeleted: false } })
            return this.databaseService.city.create({ data })
        }
        catch (error) {
            console.error("Error creating cities:", error);
            throw new HttpException(`Failed to create city: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCity(id: number): Promise<City> {
        try {
            const city = await this.databaseService.city.findUnique({ where: { id } });
            if (!city) throw new HttpException('City not found',HttpStatus.NOT_FOUND);
            return this.databaseService.city.update({
                where: { id },
                data: { isDeleted: true }
            })
        }
        catch (error) {
            console.error("Error deleting cities:", error);
            throw new HttpException(`Failed to delete city: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCity(params: { data: Prisma.CityUpdateInput, where: Prisma.CityWhereUniqueInput }): Promise<City> {
        try {
            const { data, where } = params;
            const city = await this.databaseService.city.findUnique({ where });
            if (!city) throw new HttpException('City not found',HttpStatus.NOT_FOUND);
            return this.databaseService.city.update({ where, data })
        }
        catch (error) {
            console.error("Error updating cities:", error);
            throw new HttpException(`Failed to update city: ${error.message}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}