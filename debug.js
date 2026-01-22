import { ApiClient } from "./data/source/api.js"

const cookie = ""

async function main() { 
    let client = new ApiClient()
    client.redeemCode(
        {
            server: "os_asia",
            genshinId: "",
            code: "test"
        }, 
        cookie
    )
    .then(response => {
        console.log(response)
    })
}

main()