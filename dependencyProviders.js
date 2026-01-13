import { HoyolabRepository } from "./data/HoyolabRepository.js";
import { Local } from "./data/source/local.js";
import { UserRepository } from "./data/UserRepository.js";
import { UserService } from "./domain/services/UserService.js";

export function provideUserService() {
    const localApi = new Local()
    return new UserService({
        hoyoRepository: new HoyolabRepository(),
        userRepository: new UserRepository({
            localApi: localApi
        })
    })
}