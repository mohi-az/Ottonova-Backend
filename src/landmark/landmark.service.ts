import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, Landmark } from "@prisma/client";
import { DatabaseService } from "src/database.service";
import { LandmarkFormater } from "src/utils/formater";

@Injectable()
export class LandmarkServices {
    constructor(private readonly DBService: DatabaseService) { }
    async getAllLandmarks(): Promise<Landmarks[]> {
        try {
            const landmarks = await this.DBService.landmark.findMany({
                where: { isDeleted: false },
                include: {
                    city: true,
                    LandmarkCategory: { include: { category: true } }
                },
                orderBy: {
                    id: "desc"
                }
            });
            return LandmarkFormater(landmarks);
        } catch (error) {
            console.error("Error fetching landmarks:", error);
            throw new HttpException(`Failed to fetch landmarks: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLandmarkById(id: number) {
        try {
            const landmarks = await this.DBService.landmark.findMany({
                where: { id, isDeleted: false },
                include: {
                    city: true,
                    LandmarkCategory: { include: { category: true } }
                }
            });
            if (!landmarks) throw new HttpException('landmark not found.', HttpStatus.NOT_FOUND)
            return LandmarkFormater(landmarks);
        } catch (error) {
            console.error("Error fetching landmark:", error);
            throw new HttpException(`Failed to fetch landmark: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createLandmark(Data: Prisma.LandmarkCreateInput & { cityId: number, countryName: string, cityName: string }): Promise<Landmark | []> {
        try {
            //Create new city for landmark with mandatory data (if it's not exist) then add landmark
            await this.DBService.city.upsert(
                {
                    where: { id: Data.cityId },
                    update: {},
                    create: {
                        name: Data.cityName,
                        country: Data.countryName,
                        id: Data.cityId
                    }
                })
            return await this.DBService.landmark.create({
                data: {
                    name: Data.name,
                    description: Data.description,
                    image_url: Data.image_url,
                    cityId: Data.cityId,
                    visit_duration: Data.visit_duration
                }
            });
        }
        catch (error) {
            console.error("Error creating landmark:", error);
            throw new HttpException(`Failed to create landmark: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateLandmark(Data: { data: Prisma.LandmarkUpdateInput, where: Prisma.LandmarkWhereUniqueInput, cityId: number, countryName: string; cityName: string }): Promise<Landmark> {
        try {
            //Create new city for landmark with mandatory data (if it's not exist) then update landmark
            await this.DBService.city.upsert(
                {
                    where: { id: Data.cityId },
                    update: {},
                    create: {
                        name: Data.cityName,
                        country: Data.countryName,
                        id: Data.cityId
                    }
                })
            const { data, where } = Data;
            return this.DBService.landmark.update({ data: { ...data, city: { connect: { id: Data.cityId } } }, where })
        } catch (error) {
            console.error("Error updating landmark:", error);
            throw new HttpException(`Failed to update landmark: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteLandmark(id: number): Promise<Landmark> {
        try {
            const selectedLandmark = await this.DBService.landmark.findUnique({ where: { id } });
            if (!selectedLandmark) throw new HttpException('landmark not found.', HttpStatus.NOT_FOUND)
            return this.DBService.landmark.update({ where: { id }, data: { isDeleted: true } })
        } catch (error) {
            console.error("Error deleting landmark:", error);
            throw new HttpException(`Failed to delete landmark: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}