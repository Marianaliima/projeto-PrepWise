import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuestionRepository } from "./question-abs.repository";
import { QuestionEntity } from "src/domain/entities/question.entity";

@Injectable()
export class QuestionORMRepository implements QuestionRepository {
    constructor(
        @InjectRepository(QuestionEntity)
      private questionRepository: Repository<QuestionEntity>
      ){}
    
    async save(question:QuestionEntity){
        return this.questionRepository.save(question);
      }
    
}
