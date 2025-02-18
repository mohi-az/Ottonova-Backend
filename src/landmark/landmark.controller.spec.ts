import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { LandmarkServices } from './landmark.service';
import { LandmarkController } from './landmark.controller';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('landmarkController', () => {
    let service: LandmarkServices
    let controller: LandmarkController
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LandmarkController],
            providers: [
                {
                    provide: LandmarkServices,
                    useValue: {
                        getAllLandmarks: jest.fn()
                            .mockResolvedValue([{
                                id: 30, name: "Marienplatz", description: null, imageURL: "munich-marienplatz.jpg", visitDuration: 30,
                                cityName: "Munich",
                                cityId: 10,
                                countryName: "Germany",
                                categories: null
                            }]),
                        getLandmarkById: jest.fn().mockImplementation((id) => {
                            if (id !== '1') throw new NotFoundException('Landmark not found');
                            return { id, name: 'Test Landmark' };
                        }),
                        createLandmark: jest.fn().mockImplementation((dto) => {
                            if (!dto.name) throw new BadRequestException('Landmark name is required');
                            return { id: '1' };
                        }),

                    },
                },
            ]
        }).compile()

        controller = module.get<LandmarkController>(LandmarkController);
        service = module.get<LandmarkServices>(LandmarkServices);
    })
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should return landmarks', async () => {
        const landmarks = await controller.landmark();
        expect(landmarks).toEqual([{
            id: 30, name: "Marienplatz", description: null, imageURL: "munich-marienplatz.jpg", visitDuration: 30,
            cityName: "Munich",
            cityId: 10,
            countryName: "Germany",
            categories: null
        }]
        )
    })
    it('should throw error', async () => {
        await expect(controller.landmarkById('100')).rejects.toThrow(NotFoundException)
    })
    it('should throw BadRequestException if name is missing', async () => {
        await expect(controller.createLandmark({
            name: '',
            cityId: 10,
            countryName: 'Germany',
            cityName: 'Munich',
            description: 'A famous landmark',
            image_url: null,
            visit_duration: 30,
            city: { connect: { id: 10 } }
        })
        ).rejects.toThrow(BadRequestException);
    });
})