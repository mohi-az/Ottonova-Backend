import { Test, TestingModule } from '@nestjs/testing';
import { LandmarkServices } from './landmark.service';
import { DatabaseService as PrismaService } from '../database.service';

describe('landmarkService', () => {
    let service: LandmarkServices;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LandmarkServices, PrismaService]
        }).compile();
        service = module.get<LandmarkServices>(LandmarkServices);
        prisma = module.get<PrismaService>(PrismaService);
    })
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return a list of landmarks', async () => {
        jest.spyOn(prisma.landmark, "findMany")
            .mockResolvedValue([{ name: 'xtower', cityId: 25, description: "random tower", id: 33, image_url: null, isDeleted: false, visit_duration: null }])
        const landmarks = await prisma.landmark.findMany();
        expect(landmarks).toEqual([{ name: 'xtower', cityId: 25, description: "random tower", id: 33, image_url: null, isDeleted: false, visit_duration: null }]);
    })

})