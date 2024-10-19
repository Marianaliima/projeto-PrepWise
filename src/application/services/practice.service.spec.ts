import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PracticeService } from './practice.service';
import { PracticeORMRepository } from '../ports/practice.repository';
import { QuestionORMRepository } from '../ports/question.repository';
import { GeminiService } from './gemini.service';
import { CreatePracticeDto } from 'src/interfaces/dtos/practice.dto';

describe('PracticeService', () => {
  let practiceService: PracticeService;
  let practiceRepository: PracticeORMRepository;
  let questionRepository: QuestionORMRepository;
  let geminiService: GeminiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PracticeService,
        {
          provide: 'PracticeRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: 'QuestionRepository',
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: GeminiService,
          useValue: {
            processPrompt: jest.fn(),
          },
        },
      ],
    }).compile();

    practiceService = module.get<PracticeService>(PracticeService);
    practiceRepository =
      module.get<PracticeORMRepository>('PracticeRepository');
    questionRepository =
      module.get<QuestionORMRepository>('QuestionRepository');
    geminiService = module.get<GeminiService>(GeminiService);
  });

  describe('createPractice', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      // Mockando console.error para evitar que a mensagem de erro apareça no log
      consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      // Restaurando o comportamento padrão do console.error após cada teste
      consoleErrorSpy.mockRestore();
    });
    it('should create a practice successfully', async () => {
      const practiceData: CreatePracticeDto = {
        solution: 'Sample solution',
        question: uuidv4(),
      };
      const mockQuestion = {
        id: practiceData.question,
        description: 'Sample question',
        topic: 'array',
      };
      const mockPractice = {
        id: uuidv4(),
        solution: practiceData.solution,
        question: mockQuestion,
        data: new Date('2024-01-01T00:00:00Z'),
      };

      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(mockQuestion);
      jest.spyOn(practiceRepository, 'create').mockResolvedValue(mockPractice);
      jest
        .spyOn(geminiService, 'processPrompt')
        .mockResolvedValue('Sample feedback');
      jest.spyOn(practiceRepository, 'save').mockResolvedValue(mockPractice);

      const result = await practiceService.createPractice(practiceData);

      expect(questionRepository.findOne).toHaveBeenCalledWith(
        practiceData.question,
      );
      expect(practiceRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          solution: practiceData.solution,
          question: mockQuestion,
        }),
      );
      expect(geminiService.processPrompt).toHaveBeenCalledWith(
        mockQuestion.description,
        practiceData.solution,
      );
      expect(practiceRepository.save).toHaveBeenCalledTimes(2); // called twice, once before and after processing
      expect(result).toEqual(mockPractice);
    });

    it('should throw NotFoundException if question is not found', async () => {
      const practiceData: CreatePracticeDto = {
        solution: 'Sample solution',
        question: uuidv4(),
      };

      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(null);

      await expect(
        practiceService.createPractice(practiceData),
      ).rejects.toThrow(NotFoundException);
      expect(questionRepository.findOne).toHaveBeenCalledWith(
        practiceData.question,
      );
    });

    it('should handle errors when processing prompt', async () => {
      const practiceData: CreatePracticeDto = {
        solution: 'Sample solution',
        question: uuidv4(),
      };
      const mockQuestion = {
        id: practiceData.question,
        description: 'Sample question',
        topic: 'array',
      };
      const mockPractice = {
        id: uuidv4(),
        solution: practiceData.solution,
        question: mockQuestion,
        status: 'Pending',
        data: new Date('2024-01-01T00:00:00Z'),
      };

      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(mockQuestion);
      jest.spyOn(practiceRepository, 'create').mockResolvedValue(mockPractice);
      jest
        .spyOn(geminiService, 'processPrompt')
        .mockRejectedValue(new Error('Error processing'));
      jest.spyOn(practiceRepository, 'save').mockResolvedValue(mockPractice);

      const result = await practiceService.createPractice(practiceData);

      expect(result.status).toBe('error');
      expect(practiceRepository.save).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenCalledWith(
        'Erro ao processar o prompt:',
        expect.any(Error),
      );
    });
  });

  describe('findAllPractices', () => {
    it('should return all practices', async () => {
      const mockPractices = [
        {
          id: uuidv4(),
          solution: 'Solution 1',
          data: new Date('2024-01-01T00:00:00Z'),
          question: { id: '123', description: 'uma questao', topic: 'array' },
        },
        {
          id: uuidv4(),
          solution: 'Solution 2',
          data: new Date('2024-01-01T00:00:00Z'),
          question: { id: '123', description: 'uma questao', topic: 'array' },
        },
      ];

      jest
        .spyOn(practiceRepository, 'findAll')
        .mockResolvedValue(mockPractices);

      const result = await practiceService.findAllPractices();
      expect(result).toEqual(mockPractices);
    });
  });

  describe('findPracticeById', () => {
    it('should return a practice if found', async () => {
      const mockPractice = {
        id: uuidv4(),
        solution: 'Solution',
        data: new Date('2024-01-01T00:00:00Z'),
        question: { id: '123', description: 'uma questao', topic: 'array' },
      };

      jest.spyOn(practiceRepository, 'findOne').mockResolvedValue(mockPractice);

      const result = await practiceService.findPracticeById(mockPractice.id);
      expect(result).toEqual(mockPractice);
    });

    it('should throw NotFoundException if practice not found', async () => {
      const practiceId = uuidv4();

      jest.spyOn(practiceRepository, 'findOne').mockResolvedValue(null);

      await expect(
        practiceService.findPracticeById(practiceId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePractice', () => {
    it('should update a practice', async () => {
      const practiceId = uuidv4();
      const updateData = { solution: 'Updated Solution' };
      const mockPractice = {
        id: practiceId,
        solution: 'Old Solution',
        data: new Date('2024-01-01T00:00:00Z'),
        question: { id: '123', description: 'uma questao', topic: 'array' },
      };

      jest.spyOn(practiceRepository, 'findOne').mockResolvedValue(mockPractice);
      jest.spyOn(practiceRepository, 'update').mockResolvedValue(undefined);
      jest
        .spyOn(practiceRepository, 'findOne')
        .mockResolvedValue({ ...mockPractice, ...updateData });

      const result = await practiceService.updatePractice(
        practiceId,
        updateData,
      );

      expect(practiceRepository.update).toHaveBeenCalledWith(
        practiceId,
        updateData,
      );
      expect(result.solution).toBe(updateData.solution);
    });
  });

  describe('deletePractice', () => {
    it('should delete a practice', async () => {
      const practiceId = uuidv4();
      const mockPractice = {
        id: practiceId,
        solution: 'Solution',
        data: new Date('2024-01-01T00:00:00Z'),
        question: { id: '123', description: 'uma questao', topic: 'array' },
      };

      jest.spyOn(practiceRepository, 'findOne').mockResolvedValue(mockPractice);
      jest.spyOn(practiceRepository, 'remove').mockResolvedValue(undefined);

      await practiceService.deletePractice(practiceId);

      expect(practiceRepository.remove).toHaveBeenCalledWith(practiceId);
    });
  });
});
