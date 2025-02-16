import { Injectable } from "@nestjs/common";
import { Category, Prisma, Landmark } from "@prisma/client";
import { DatabaseService } from "src/database.service";
import { LandmarkFormater } from "src/utils/formater";

@Injectable()
export class LandmarkServices {

    constructor(private readonly DBService: DatabaseService) { }

    async GetAllLandmard():Promise<Landmarks[]> {
        const landmarks = await this.DBService.landmark.findMany({
            where: { isDeleted: false },
            include: {
                city: true,
                LandmarkCategory: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return LandmarkFormater(landmarks);
    }
    async GetLandmarkById(id: number) {
        
        const landmarks = await this.DBService.landmark.findMany({
            where: { id, isDeleted: false },
            include: {
                city: true,
                LandmarkCategory: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return LandmarkFormater(landmarks);
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