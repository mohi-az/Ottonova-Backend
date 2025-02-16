import { Injectable } from "@nestjs/common";
import { City, Landmark, Prisma } from "@prisma/client";
import { DatabaseService } from "src/database.service";
@Injectable()
export class CityService {
    constructor(private DBService: DatabaseService) { }

    async getAllCities(): Promise<(City & { landmarks: Landmark[] })[]> {
        return this.DBService.city.findMany({ where: { isDeleted: false }, include: { landmarks: true } }
        );
    }
    async getCityById(cityId: number): Promise<(City & { landmarks: Landmark[] }) | null> {
        return this.DBService.city.findUnique({
            where: {
                id: cityId,
                isDeleted: false
            },
             include: { landmarks: true }
        });
    }
    async createCity(data: Prisma.CityCreateInput): Promise<City> {
        return this.DBService.city.create({ data })
    }
    async deleteCity(id: number): Promise<City> {
        return this.DBService.city.update({
            where: { id },
            data: { isDeleted: true }
        })
    }
    async updateCity(params: { data: Prisma.CityUpdateInput, where: Prisma.CityWhereUniqueInput }): Promise<City> {
        const { data, where } = params;
        return this.DBService.city.update({ where, data })
    }
}