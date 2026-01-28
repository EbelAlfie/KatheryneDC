export class DailyNote {
    constructor({
        currentResin,
        maxResin,
        resinRecoveryTime,
        finishedTaskNum,
        totalTaskNum,
        isExtraTaskRewardReceived,
        remainResinDiscountNum,
        resinDiscountNumLimit,
        currentExpeditionNum,
        maxExpeditionNum,
        currentHomeCoin,
        maxHomeCoin,
        homeCoinRecoverTime
    }) {
        this.currentResin = currentResin ?? 0
        this.maxResin = maxResin ?? 200
        this.resinRecoveryTime = resinRecoveryTime ?? "0"
        this.finishedTaskNum = finishedTaskNum ?? 0
        this.totalTaskNum = totalTaskNum ?? 4
        this.isExtraTaskRewardReceived = isExtraTaskRewardReceived ?? false
        this.remainResinDiscountNum = remainResinDiscountNum ?? 1
        this.resinDiscountNumLimit = resinDiscountNumLimit ?? 3
        this.currentExpeditionNum = currentExpeditionNum ?? 0
        this.maxExpeditionNum = maxExpeditionNum ?? 5

        this.currentHomeCoin = currentHomeCoin ?? 0
        this.maxHomeCoin = maxHomeCoin ?? 2400
        this.homeCoinRecoverTime = homeCoinRecoverTime ?? "0"
    }

    estimateResinRecoverDate() {
        const now = new Date()
        const resinLeft = this.maxResin - this.currentResin
        if (resinLeft <= 0) {
            now.setHours(now.getHours() + 2)
            return now
        }
        const secondsPerResin = this.resinRecoveryTime / resinLeft

        const threshold = 160 

        const resinThreshold = threshold - this.currentResin

        if (resinThreshold <= 0) { //More that 160
            now.setSeconds(now.getSeconds() + this.resinRecoveryTime)
        } else { 
            const timeNeeded = resinThreshold * secondsPerResin
            now.setSeconds(now.getSeconds() + timeNeeded)
        }
        return now
    }

    estimateTeapotCoinFull() {
        const now = new Date()
        const coinLeft = this.maxHomeCoin - this.currentHomeCoin
        if (coinLeft <= 0) {
            now.setHours(now.getHours() + 2)
            return now
        }
        const secondsPerResin = this.homeCoinRecoverTime / coinLeft

        const threshold = 2000 

        const resinThreshold = threshold - this.currentHomeCoin

        if (resinThreshold <= 0) {
            now.setSeconds(now.getSeconds() + this.homeCoinRecoverTime)
        } else { 
            const timeNeeded = resinThreshold * secondsPerResin
            now.setSeconds(now.getSeconds() + timeNeeded)
        }
        return now
    }

    static fromResponse(rawResponse) {
        let body = rawResponse.data ?? null
        return new DailyNote(
            {
                currentResin: body?.current_resin,
                maxResin: body?.max_resin,
                resinRecoveryTime: body?.resin_recovery_time,
                finishedTaskNum: body?.finished_task_num,
                totalTaskNum: body?.total_task_num,
                isExtraTaskRewardReceived: body?.is_extra_task_reward_received,
                remainResinDiscountNum: body?.remain_resin_discount_num,
                resinDiscountNumLimit: body?.resin_discount_num_limit,
                currentExpeditionNum: body?.current_expedition_num,
                maxExpeditionNum: body?.max_expedition_num,
                currentHomeCoin: body?.current_home_coin,
                maxHomeCoin: body?.max_home_coin,
                homeCoinRecoverTime: body?.home_coin_recovery_time
            }
        )
    }


}