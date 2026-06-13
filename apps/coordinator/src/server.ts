import { createApp } from "./app.js";

const port = Number.parseInt(process.env.COORDINATOR_PORT ?? "4100", 10);
const app = createApp();

try {
  await app.listen({ host: "0.0.0.0", port });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
