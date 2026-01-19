import axios from "axios";
import { HoyoResponse } from "../response/HoyoResponse.js";
import { HoyoResponseError } from "../response/HoyoErrorResponse.js";

export class ApiClient {
  async login(requestBody) {

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
      .then(response => {
        const body = response.data 
        const result = HoyoResponse.transformWithHeader(body, response?.headers) 

        if (result.isSuccess()) return result
        else throw HoyoResponseError.createErrorByResponse(body)
      })
  }


  async checkIn(cookies) {
      const headers = Object.assign(this.getDefaultHeader(), { 'Cookie': cookies })

      return axios.post(
        "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us", 
        {"act_id":"e202102251931481"},
        { 
          headers: headers 
        }
      ).then(response => {
        console.log("Success check in")
        const body = response.data 
        const result = HoyoResponse.transform(response)
        if (result.isSuccess()) return result
        else throw HoyoResponseError.createErrorByResponse(body)
      })
  }

  async getDailyNote(param, cookies) {
    const {
      server = "os_asia",
      genshinId = ""
    } = param
    const headers = Object.assign(this.getDefaultHeader(), { 'Cookie': cookies })
    const params = `server=${server}&role_id=${genshinId}`
    const url = `https://sg-public-api.hoyolab.com/event/game_record/genshin/api/dailyNote?${params}`
    return axios.get(url,
      {
        headers: headers
      }
    ).then(response => {
        console.log("Success dapet daily note")
        const body = response.data 
        const result = HoyoResponse.transform(response)
        if (result.isSuccess()) return result
        else throw HoyoResponseError.createErrorByResponse(body)
    })
  }

  async getGameRecord(uid, cookies) {
    const headers = Object.assign(this.getDefaultHeader(), { 'Cookie': cookies })
    const param = `uid=${uid}`
    const url = `https://sg-public-api.hoyolab.com/event/game_record/card/wapi/getGameRecordCard?${param}`
    return axios.get(url, 
      {
        headers: headers
      }
    )
      .then(response => {
        const body = response.data 
        const result = HoyoResponse.transform(response)
        if (result.isSuccess()) return result
        else throw HoyoResponseError.createErrorByResponse(body)
      })
  }

  getDefaultHeader() {
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
}