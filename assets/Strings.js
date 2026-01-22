export const StringRes = {
    message_greetings: clean(`
    Ad astra abyssosque! Welcome to the Adventurers' Guild.
    We are always delighted to see a new face with a heart for adventure.
    If you wish to officially register as a guild member, simply click the Register button below.
    `),
    message_checkdm: "Kindly check your DM, traveler",
    message_failed_dm: "I'm unable to send you a direct message at the moment.. Kindly check your privacy settings",
    message_success_regist: clean(`
    Ad astra abyssosque! 
    Registration completed! Your adventure profile has been recorded in the guild's system. 
    The Adventurers' Guild will look forward supporting you in your journey.
    `),
    message_failed_regist:`Registration failed!`,
    message_failed_checkin: (user) => clean(`
    Check-in failed! 😞
    Dear ${user},
    Unfortunately, the guild encounter some error while checkin you in.. 
    `),
    message_not_logged_in: clean(`
    I am sorry, it seems like your cookie might have expired. 
    Kindly reregister using the button below
    `),
    message_success_checkin: (user) => `
    Check in success! Dear ${user} kindly check your in-game mail for some reward 🎁
    `,

    message_resin_empty: (user, resin) => clean(`
    Ad astra abyssosque, ${user}!
    Total resin: ${resin}
    Great job 👏
    `),
    message_resin_almost_full: (user, resin) => clean(`
    Ad astra abyssosque, ${user}! 
    Your resin is almost full
    Total resin: ${resin}
    `),
    message_resin_full: (user, resin) => clean(`
    Ad astra abyssosque, ${user}! 
    Your resin is already full
    Total resin: ${resin}
    `),
    message_invalid_redeem_code: "It seems like the redeem code inputed is invalid",
    message_code_redeemed: (user) => `Dear ${user}, code successfully redeemed! Claim them before it expires~`
}

function clean(str) {
  return str
    .split('\n')
    .map(line => line.replace(/^\s+/, ''))
    .join('\n')
    .trim()
}
