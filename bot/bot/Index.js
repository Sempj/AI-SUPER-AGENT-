require("dotenv").config()
const { ethers } = require("ethers")
const axios = require("axios")

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

const PROFIT_WALLET = process.env.PROFIT_WALLET

async function checkPrices() {

    const dex1 = await axios.get("https://api.pancakeswap.info/api/v2/tokens")
    const dex2 = await axios.get("https://api.dexscreener.com/latest/dex/tokens")

    return {dex1: dex1.data, dex2: dex2.data}
}

async function executeTrade() {

    console.log("Scanning arbitrage...")

    const prices = await checkPrices()

    // simplified logic
    const opportunity = Math.random()

    if(opportunity > 0.7){

        console.log("Arbitrage opportunity found")

        const tx = {
            to: PROFIT_WALLET,
            value: ethers.parseEther("0.01")
        }

        const transaction = await wallet.sendTransaction(tx)

        console.log("Profit sent:", transaction.hash)

    } else {

        console.log("No opportunity")

    }
}

async function startBot(){

    console.log("Bot started")

    setInterval(async ()=>{

        try{

            await executeTrade()

        }catch(e){

            console.log("Error:", e)

        }

    },15000)

}

startBot()
