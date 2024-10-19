import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionORMRepository } from '../ports/question.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateQuestionDto } from 'src/interfaces/dtos/question.dto';

describe('QuestionService', () => {
  let questionService: QuestionService;
  let questionRepository: QuestionORMRepository;

  const mockQuestionRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: QuestionORMRepository, // O mesmo nome que você usa na injeção
          useValue: mockQuestionRepository,
        },
      ],
    }).compile();

    questionService = module.get<QuestionService>(QuestionService);
    questionRepository = module.get<QuestionORMRepository>(
      QuestionORMRepository,
    );
  });

  it('should create a question', async () => {
    const questionData = {
      description: 'What is NestJS?',
      topic: 'NestJS',
    };
    mockQuestionRepository.save.mockReturnValueOnce({
      ...questionData,
      id: uuidv4(),
    });

    const result = await questionService.createQuestion(
      questionData.description,
      questionData.topic,
    );

    expect(result).toHaveProperty('id');
    expect(result.description).toEqual(questionData.description);
    expect(result.topic).toEqual(questionData.topic);
    expect(mockQuestionRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        description: questionData.description,
        topic: questionData.topic,
      }),
    );
  });

  describe('getQuestionById', () => {
    it('should return a question by ID', async () => {
      const mockId = uuidv4();
      const mockQuestion = {
        id: mockId,
        description: 'Sample question',
        topic: 'Sample topic',
      };
      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(mockQuestion);

      const result = await questionService.getQuestionById(mockId);

      expect(result).toEqual({
        id: mockId,
        description: mockQuestion.description,
        topic: mockQuestion.topic,
      });
    });

    it('should throw BadRequestException if ID is not a valid UUID', async () => {
      await expect(
        questionService.getQuestionById('invalid-uuid'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if question is not found', async () => {
      const mockId = uuidv4();
      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(null);

      await expect(questionService.getQuestionById(mockId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateQuestion', () => {
    it('should update a question', async () => {
      const mockId = uuidv4();
      const updateQuestionDto: UpdateQuestionDto = {
        description: 'Updated question',
      };
      const mockQuestion = {
        id: mockId,
        description: 'Old question',
        topic: 'Sample topic',
      };
      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(mockQuestion);
      jest
        .spyOn(questionRepository, 'save')
        .mockResolvedValue({ ...mockQuestion, ...updateQuestionDto });

      const result = await questionService.updateQuestion(
        mockId,
        updateQuestionDto,
      );

      expect(result).toEqual({
        id: mockId,
        description: 'Updated question',
        topic: 'Sample topic',
      });
      expect(questionRepository.save).toHaveBeenCalledWith({
        ...mockQuestion,
        ...updateQuestionDto,
      });
    });

    it('should throw NotFoundException if question is not found', async () => {
      const mockId = uuidv4();
      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(null);

      await expect(questionService.updateQuestion(mockId, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteQuestion', () => {
    it('should delete a question', async () => {
      const mockId = uuidv4();
      const mockQuestion = {
        id: mockId,
        description: 'Sample question',
        topic: 'Sample topic',
      };
      jest.spyOn(questionRepository, 'findOne').mockResolvedValue(mockQuestion);
      jest.spyOn(questionRepository, 'remove').mockResolvedValue(undefined);

      await questionService.deleteQuestion(mockId);

      expect(questionRepository.remove).toHaveBeenCalledWith(mockId);
    });

    // it('should throw NotFoundException if question is not found', async () => {
    //   const mockId = uuidv4();
    //   jest.spyOn(questionRepository, 'findOne').mockResolvedValue(null);

    //   await expect(questionService.deleteQuestion(mockId)).rejects.toThrow(
    //     NotFoundException,
    //   );
    // });

    // it('should throw BadRequestException on unexpected error', async () => {
    //   const mockId = uuidv4();
    //   jest.spyOn(questionRepository, 'findOne').mockResolvedValue({
    //     id: mockId,
    //     description: 'Sample question',
    //     topic: 'Sample topic',
    //   });
    //   jest.spyOn(questionRepository, 'remove').mockImplementation(() => {
    //     throw new Error('Unexpected error');
    //   });

    //   await expect(questionService.deleteQuestion(mockId)).rejects.toThrow(
    //     BadRequestException,
    //   );
    // });
  });

  describe('getAllQuestions', () => {
    it('should return all questions', async () => {
      const mockQuestions = [
        { id: uuidv4(), description: 'Question 1', topic: 'Topic 1' },
        { id: uuidv4(), description: 'Question 2', topic: 'Topic 2' },
      ];
      jest
        .spyOn(questionRepository, 'findAll')
        .mockResolvedValue(mockQuestions);

      const result = await questionService.getAllQuestions();

      expect(result).toEqual(
        mockQuestions.map((q) => ({
          id: q.id,
          description: q.description,
          topic: q.topic,
        })),
      );
    });
  });
});
