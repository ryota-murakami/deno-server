const server = Deno.listen({port: 8080})
console.log('HTTP webserver running. Access it at: http://localhost:8080/')

for await (const conn of server) {
  serverHttp(conn)
}

async function serverHttp(conn :Deno.Conn) {
  const httpConn = Deno.serveHttp(conn)
  for await (const requestEvent of httpConn) {
    const body = `Your user-agent is:\n\n${
      requestEvent.request.headers.get("user-agent") ?? "Unknown"
    }`;

    requestEvent.respondWith(
    new Response(body, {
      status: 200,
    })
    )
  }
}
