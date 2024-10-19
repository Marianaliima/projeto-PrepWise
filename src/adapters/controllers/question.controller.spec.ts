import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../../application/services/question.service';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            getAllQuestions: jest.fn().mockResolvedValue([
              {
                id: '123',
                description: 'uma questao',
                topic: 'array',
              },
            ]),
            createQuestion: jest.fn().mockResolvedValue({
              id: '123',
              description: 'uma questao',
              topic: 'array',
            }),
            getQuestionById: jest.fn().mockResolvedValue({
              id: '123',
              description: 'uma questao',
              topic: 'array',
            }),
            delete: jest.fn().mockResolvedValue(undefined),
            updateQuestion: jest.fn().mockResolvedValue({
              id: '123',
              description: 'uma questao',
              topic: 'array',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  it('deve retornar todas as questions', async () => {
    expect(await controller.findAll()).toEqual([
      {
        id: '123',
        description: 'uma questao',
        topic: 'array',
      },
    ]);
    expect(service.getAllQuestions).toHaveBeenCalled();
  });

  it('deve criar uma nova question', async () => {
 
    expect(await controller.createQuestion('uma questao', 'array')).toEqual({
      id: '123',
      description: 'uma questao',
      topic: 'array',
    });
    expect(service.createQuestion).toHaveBeenCalledWith('uma questao', 'array');
  });
});
