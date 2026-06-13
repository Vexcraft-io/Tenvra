export function GET() {
  return Response.json({
    service: "tenvra-web",
    status: "ok",
    stage: "scaffold",
  });
}
