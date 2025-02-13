import { Injectable } from "@nestjs/common";
import { Landmark, Prisma } from "@prisma/client";
import { DatabaseService } from "src/database.service";

@Injectable()
export class LandmarkServices {

    constructor(private readonly DBService: DatabaseService) { }

    async GetAllLandmard(): Promise<Landmark[]> {
        return this.DBService.landmark.findMany({ where: { isDeleted: false } });

    }
    async GetLandmarkById(id: number): Promise<Landmark | null> {
        return this.DBService.landmark.findUnique({ where: { id, isDeleted: false } })
    }
    async CreateLandmark(data: Prisma.LandmarkCreateInput & { cityId: number }): Promise<Landmark | []> {
        const Selectedcity = await this.DBService.city.findUnique({ where: { id: data.cityId } })
        if (!Selectedcity) return []
        return this.DBService.landmark.create({
            data: {
                name: data.name,
                description: data.description,
                image_url: data.image_url,
                city: { connect: { id: Selectedcity.id } }
            }
        });
    }
    async UpdateLandmark(params: { data: Prisma.LandmarkUpdateInput, where: Prisma.LandmarkWhereUniqueInput }): Promise<Landmark> {
        const { data, where } = params
        return this.DBService.landmark.update({ data, where })
    }
    async DeleteLandmark(id: number): Promise<Landmark> {
        return this.DBService.landmark.update({ where: { id }, data: { isDeleted: true } })
    }
}