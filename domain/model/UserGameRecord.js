export class UserGameRecord { 
    constructor({
        gameId,
        gameRoleId,
        nickname,
        region
    }) { 
        this.gameId = gameId ?? 2
        this.gameRoleId = gameRoleId ?? ""
        this.nickname = nickname ?? ""
        this.region = region ?? "os_asia"
    }

    static fromResponse(response) { 
        const body = response.data
        const gameList = body.list

        const genshinData = gameList[0] //TODO develop for other game

        return new UserGameRecord({
            gameId: genshinData?.game_id,
            gameRoleId: genshinData?.game_role_id,
            nickname: genshinData?.nickname,
            region: genshinData?.region
        })
    }
}