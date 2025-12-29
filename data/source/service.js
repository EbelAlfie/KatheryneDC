import axios from "axios";

export async function login(requestBody) {

  const headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://account.hoyolab.com",
    "Referer": "https://account.hoyolab.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",

    "x-rpc-aigis_v4": "true",
    "x-rpc-app_version": "",
    "x-rpc-app_id": "ce1tbuwb00zk",
    "x-rpc-client_type": "4",
    "x-rpc-device_model": "Chrome Mobile 128.0.0.0",
    "x-rpc-device_name": "Chrome Mobile",
    "x-rpc-device_os": "Android 6.0",
    "x-rpc-game_biz": "hk4e_global",
    "x-rpc-language": "en-us",
    "x-rpc-referrer": "https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481&hyl_auth_required=true&hyl_presentation_style=fullscreen&utm_source=hoyolab&utm_medium=tools&lang=en-us&bbs_theme=dark&bbs_theme_device=1",
    "x-rpc-sdk_version": "2.31.0"
  }

  return axios.post(
    "https://passport-api-sg.hoyolab.com/account/ma-passport/api/webLoginByPassword", 
    {
      "account": requestBody.account,
      "password": requestBody.password,
      "token_type": 6
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