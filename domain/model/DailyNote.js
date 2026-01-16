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

    estimateResinRecoverTime() {
        
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