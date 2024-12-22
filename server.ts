import { bot } from "./src/bot.ts"

const projectId = `zeckson-finance-bot`
const deploymentId = Deno.env.get(`DENO_DEPLOYMENT_ID`)
const deployUrl = deploymentId
    ? `https://${projectId}${deploymentId ? `-${deploymentId}` : ``}.deno.dev`
    : `http://localhost:8000`

const DEFAULT_RESPONSE = new Response(
    `Hello World!
${deployUrl}`,
    {
        headers: { 'content-type': 'text/plain' },
    },
)

const handleUpdate = await bot.createWebhook({ domain: "example.com" })

Deno.serve(async (req) => {
    let response = DEFAULT_RESPONSE

    const start = Date.now()
    if (req.method == 'POST') {
        const url = new URL(req.url)
        if (url.pathname.slice(1) == bot.secretPathComponent()) {
            console.log('Got webhook request')
            try {
                await handleUpdate(req, response)
            } catch (err) {
                console.error(err)

                response = Response.error()
            }
        }
    }

    console.debug(
        `${req.method} ${req.url} - ${response.status} "${response.type}" in ${
            Date.now() - start
        }ms`,
    )
    return response
})

console.log(`Deno deploy url: ${deployUrl}`)

// 5. Set webhook only for production
// await bot.telegram.setWebhook(`${deployUrl}/${bot.secretPathComponent()}`)

console.log(`Deno deploy url: ${deployUrl}/${bot.secretPathComponent()}`)
