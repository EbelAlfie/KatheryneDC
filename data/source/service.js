import axios from "axios";

export async function login(requestBody) {

  const headers = {
    'accept': 'application/json, text/plain, */*', 
    'accept-language': 'en-US,en;q=0.9,id;q=0.8', 
    'content-type': 'application/json', 
    'origin': 'https://account.hoyoverse.com', 
    'priority': 'u=1, i', 
    'referer': 'https://account.hoyoverse.com/', 
    'sec-ch-ua': '"Microsoft Edge";v="143", "Chromium";v="143", "Not A(Brand";v="24"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-site', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0', 
    'x-rpc-age_gate': 'true', 
    'x-rpc-aigis_v4': 'true', 
    'x-rpc-app_id': 'de8ohyzxreo0', 
    'x-rpc-app_version': '', 
    'x-rpc-client_type': '4', 
    'x-rpc-device_fp': '38d7f69465917', 
    'x-rpc-device_id': 'e09f9a51-cb9f-40e6-834c-d191e0263fdb', 
    'x-rpc-device_model': 'Microsoft Edge 143.0.0.0', 
    'x-rpc-device_name': 'Microsoft Edge', 
    'x-rpc-device_os': 'OS X 10.15.7', 
    'x-rpc-domain_redirect': 'true', 
    'x-rpc-game_biz': 'plat_os', 
    'x-rpc-language': 'en-us', 
    'x-rpc-lifecycle_id': 'fd1f394c-67b4-4efd-91e5-62105550438b', 
    'x-rpc-referrer': 'https://account.hoyoverse.com/passport/index.html#/home/account-overview', 
    'x-rpc-sdk_version': '2.47.0', 
    'Cookie': 'mi18nLang=en-us; _HYVUUID=e09f9a51-cb9f-40e6-834c-d191e0263fdb; HYV_LOGIN_PLATFORM_OPTIONAL_AGREEMENT={%22content%22:[]}; HYV_LOGIN_PLATFORM_TRACKING_MAP={}; DEVICEFP_SEED_ID=05f65956943214b8; DEVICEFP_SEED_TIME=1768063896490; DEVICEFP=38d7f69465917; HYV_LOGIN_PLATFORM_LOAD_TIMEOUT={%22value%22:null}; account_id_v2=295092964; account_mid_v2=1wfkk1cxcp_hy; cookie_token_v2=v2_CAQSDGRlOG9oeXp4cmVvMBokZTA5ZjlhNTEtY2I5Zi00MGU2LTgzNGMtZDE5MWUwMjYzZmRiIK-HissGKOHGpMoHMOSF24wBOAFCB3BsYXRfb3M.n-JjaQAAAAAB.MEQCIBUKOWd3fbKWzgThL0WNXWeHsu1_N93k3FVjjFk80FjFAiBP0CAiHXGVu7r3oAxkovQKKz_H3MNyKVO_Gpet9V67CQ'
  }

  return axios.post(
    "https://passport-api-sg.hoyoverse.com/account/ma-passport/api/webLoginByPassword", 
    {
      "account": requestBody.account,
      "password": requestBody.password,
      "token_type": 4
    },
    { 
      headers: headers 
    }
  )
}


export async function checkIn(cookies) {
    const headers = getDefaultHeader() + {
      'Cookie': cookies
    }

    return axios.post(
      "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us", 
      {"act_id":"e202102251931481"},
      { 
        headers: headers 
      }
    )
}

function getDefaultHeader() {
  return {
    'accept': 'application/json, text/plain, /', 
      'accept-language': 'en-US,en;q=0.9,id;q=0.8', 
      'content-type': 'application/json;charset=UTF-8', 
      'origin': 'https://act.hoyolab.com', 
      'priority': 'u=1, i', 
      'referer': 'https://act.hoyolab.com/', 
      'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"', 
      'sec-ch-ua-mobile': '?0', 
      'sec-ch-ua-platform': '"Windows"', 
      'sec-fetch-dest': 'empty', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-site': 'same-site', 
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0', 
      'x-rpc-app_version': '', 
      'x-rpc-device_name': '', 
      'x-rpc-platform': '4'
  }
}