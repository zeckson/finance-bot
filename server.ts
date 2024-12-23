import { bot } from "./src/bot.ts";

const projectId = `zeckson-finance-bot`;
const deploymentId = Deno.env.get(`DENO_DEPLOYMENT_ID`);
const deployUrl = deploymentId
  ? `https://${projectId}${deploymentId ? `-${deploymentId}` : ``}.deno.dev`
  : `http://localhost:8000`;

const DEFAULT_RESPONSE = (req: Request) =>
  new Response(
    `Hello World!
Request url: ${req.url}
Deploy url: ${deployUrl}`,
    {
      headers: { "content-type": "text/plain" },
    },
  );

// TODO: hash token like it's done in bot.secretPathComponent
const webhookPath = `${deployUrl}/${bot.telegram.token}`;

Deno.serve(async (req) => {
  const start = Date.now();
  let response = DEFAULT_RESPONSE(req);
  try {
    if (req.method == "POST") {
      const url = new URL(req.url);
      const path = url.pathname.slice(1);
      if (path == bot.telegram.token) {
        console.debug(`Got Update JSON from telegram server`);
        try {
          const json = await req.json();
          await bot.handleUpdate(json);
          response = new Response("OK", { status: 200 });
        } catch (err) {
          console.error(err);

          response = Response.error();
        }
      } else if (path == "webhook") {
        // Set webhook only for production
        await bot.telegram.setWebhook(webhookPath);

        console.log(
          `Webhook is set to: ${webhookPath}`,
        );

        response = DEFAULT_RESPONSE(req);
      }
    }
  } finally {
    console.debug(
      `${req.method} ${req.url} - ${response.status} "${response.type}" in ${
        Date.now() - start
      }ms`,
    );
  }

  return response;
});

console.log(`Deno deploy url: ${deployUrl}`);
