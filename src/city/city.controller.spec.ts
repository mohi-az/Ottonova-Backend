import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { NotFoundException } from '@nestjs/common';
describe('CityController', () => {
    let controller: CityController;
    let service: CityService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CityController],
            providers: [
                {
                    provide: CityService,
                    useValue: {
                        getAllCities: jest.fn().mockResolvedValue([{ id: 1, name: 'Tehran' }]),
                        getCityById: jest.fn().mockImplementation((id) => {
                            if (id !== '1') throw new NotFoundException('city not found');
                            return { id, name: 'Test city' };
                        })
                    },
                },
            ],
        }).compile();

        controller = module.get<CityController>(CityController);
        service = module.get<CityService>(CityService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should return a list of cities', async () => {
        const result = await controller.cities();
        expect(result).toEqual([{ id: 1, name: 'Tehran' }]);
        expect(service.getAllCities).toHaveBeenCalledTimes(1);
    });
    it('should throw error', async () => {
        await expect(controller.cityById('100')).rejects.toThrow(NotFoundException)
    })
})