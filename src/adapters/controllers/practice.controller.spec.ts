import { Test, TestingModule } from '@nestjs/testing';
import { PracticeController } from './practice.controller';
import { PracticeService } from '../../application/services/practice.service';

describe('PracticeController', () => {
  let controller: PracticeController;
  let service: PracticeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticeController],
      providers: [
        {
          provide: PracticeService,
          useValue: {
            findAllPractices: jest.fn().mockResolvedValue([
              {
                id: '123',
                solution: 'solution',
                data: '2024-10-10',
                feedback: 'feedback',
                status: 'processes',
              },
            ]),
            createPractice: jest.fn().mockResolvedValue({
              id: '123',
              solution: 'solution',
              question: '123',
            }),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<PracticeController>(PracticeController);
    service = module.get<PracticeService>(PracticeService);
  });

  it('deve retornar todas as practices', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: '123',
        solution: 'solution',
        data: '2024-10-10',
        feedback: 'feedback',
        status: 'processes',
      },
    ]);
    expect(service.findAllPractices).toHaveBeenCalled();
  });

  it('deve criar uma nova practice', async () => {
    const newPractice = {
      solution: 'solution',
      question: '123',
    };
    expect(await controller.create(newPractice)).toEqual({
      id: '123',
      solution: 'solution',
      question: '123',
    });
    expect(service.createPractice).toHaveBeenCalledWith(newPractice);
  });
});
