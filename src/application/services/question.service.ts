import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '../ports/question-abs.repository';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class QuestionService {
    constructor(private readonly questionRepository: QuestionRepository) {}

    createQuestion(
        description: string,
        topic: string
    ) {
       return this.questionRepository.save(
           {
               description,
               topic,
               id: uuidv4()
           }
        )
    
    }
    
}

