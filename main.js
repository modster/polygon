import "https://deno.land/std@0.184.0/dotenv/load.ts";

const log = console.log;
const encoder = new TextEncoder();
const projectId = Deno.env.get("INFURA_API_KEY");
// log(projectId);

const data = JSON.stringify({
    "jsonrpc":"2.0","method":"eth_blockNumber","params": [],"id":1
});

await fetch(new URL(`https://mainnet.infura.io/v3/${projectId}`), {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
    },
    body: data,
    })
    .then((response) => response.json())
    .then(async (d) => {
        await Deno.writeFile("data.json", encoder.encode(JSON.stringify(d)));
        log(d);
        return;
    })
    .catch(error => {
        console.error(error)
    })
