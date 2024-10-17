import { AccountEntity } from "src/domain/entities/account.entity";

export abstract class AccountRepository {
    abstract save(cliente:AccountEntity)
}