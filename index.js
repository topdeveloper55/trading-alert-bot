const axios = require("axios");
const token_tickers = ["BTC", "ETH", "BNB", "DOGE", "XRP", "BCH", "LTC", "APE", "MATIC", "TRX", "SOL", "LINK", "CHZ", "ADA", "TWT", "SHIB", "DOT", "EOS", "AVAX", "XMR", 
"ATOM", "ETC", "DASH", "FTM", "SAND", "AXS", "STX", "NEAR", "UNI", "FIL", "NEO", "ALGO", "APT", "XLM", "AAVE", "FLOW", "RUNE", "MANA", "CRV", "ZEC", "GRT", "CAKE", "VET", 
"GMX", "ICP", "KAVA", "BAT", "KLAY", "ZIL", "SNX", "AR", "OSMO", "ENS", "EGLD", "QNT", "XTZ", "THETA", "MKR", "HBAR", "PAXG"];
const criteria = 5;

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const main = async () => {
    try {
        while (1) {
            for (let i = 0; i < token_tickers.length; i++) {
                for (let j = 1; j <= 59; j++) {
                    let buf = await axios.get(`https://api.binance.com/api/v3/ticker?symbol=${token_tickers[i]}USDT&windowSize=${j}m`);
                    if (Math.abs(Number(buf.data.priceChangePercent)) >= criteria) {
                        console.log("trading alert ->> ", token_tickers[i], buf.data.lastPrice, buf.data.priceChangePercent);
                        break;
                    }
                }
            }
            await sleep(1000);
        }
    } catch (e) {
        console.error(e);
    }
}
main();