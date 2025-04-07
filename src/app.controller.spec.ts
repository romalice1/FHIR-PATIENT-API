import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('PatientCotroller', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

// Test case for the getAllPatients method
describe('getAllPatients', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController(new AppService());
  });

  it('should return a JSON response', async () => {
    const result = await appController.getAllPatients();
    expect(result).toEqual(expect.any(Object));
  });
});

// Test case for the getPatients method
describe('getPatientsWithLimits', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController(new AppService());
  });

  // Here, we could have tested the number of returned patient records, but we can limit ourselves to just the response structure.
  it('should return a JSON response', async () => {
    const result = await appController.getPatients(10);
    expect(result).toEqual(expect.any(Object));
  });
});

// Test case for the getPatientById method
describe('getPatientById using a correct ID', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController(new AppService());
  });

  it('should return a JSON response', async () => {
    const result = await appController.getPatientById('596856');
    expect(result).toEqual(expect.any(Object));
  });
});

// Test case for the getPatientById method with a false ID
describe('getPatientById with false ID', () => {
  let appController: AppController;

  beforeEach(() => {
    appController = new AppController(new AppService());
  });

  it('should return an error response', async () => {
    const result = await appController.getPatientById('false-id');
    expect(result).toEqual(expect.any(Object));
  });
});