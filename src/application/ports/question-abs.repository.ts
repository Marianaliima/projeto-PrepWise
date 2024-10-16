import { QuestionEntity } from "src/domain/entities/question.entity";

export abstract class QuestionRepository {
    abstract save(cliente: QuestionEntity)
}