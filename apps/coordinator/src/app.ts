import Fastify from "fastify";

import { protocolVersion } from "@tenvra/contracts";

export function createApp() {
  const app = Fastify({ logger: true });

  app.get("/health", () => ({
    service: "tenvra-coordinator",
    stage: "scaffold",
    status: "ok",
    protocolVersion,
  }));

  return app;
}
