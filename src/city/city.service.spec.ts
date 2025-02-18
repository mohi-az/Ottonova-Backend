import { Test, TestingModule } from '@nestjs/testing';
import { CityService } from './city.service';
import { DatabaseService as PrismaService } from '../database.service';

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({ providers: [CityService, PrismaService], }).compile();
    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of cities', async () => {
    jest.spyOn(prisma.city, 'findMany').mockResolvedValue([
      {
        id: 1, name: 'Tehran', latitude: "23.55", longitude: "35.42",
        country: "Iran", description: "Iran", population: "12000000", name_native: "تهران",
        climate: "warm", continent: "Asia", currency: "Rial", founded: "2000", isDeleted: false, timezone: null
      }]);
    const cities = await service.getAllCities();
    expect(cities).toEqual([
      {
        id: 1, name: 'Tehran', latitude: "23.55", longitude: "35.42",
        country: "Iran", description: "Iran", population: "12000000", name_native: "تهران",
        climate: "warm", continent: "Asia", currency: "Rial", founded: "2000", isDeleted: false, timezone: null
      }]);
  });

  it('should create a new city', async () => {
    const newCity = {
      id: 1, name: 'Berlin', latitude: "23.55", longitude: "35.42",
      country: "Germany", description: "Germany", population: "12000000", name_native: "deutschland",
      climate: "-", continent: "Europ", currency: "Euro", founded: "2000", isDeleted: false, timezone: null
    };
    jest.spyOn(prisma.city, 'create').mockResolvedValue(newCity);
    const result = await service.createCity({ name: 'Berlin', id: 1, country: "Germany" });
    expect(result).toEqual(newCity);
  });
});
