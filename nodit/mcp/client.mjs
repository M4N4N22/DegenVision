import { spawn } from "child_process"

export function startMCP(onMessage) {
  const mcp = spawn("npx", ["@noditlabs/nodit-mcp-server@latest"], {
    env: { ...process.env, NODIT_API_KEY: process.env.NODIT_API_KEY },
    stdio: ["pipe", "pipe", "inherit"],
    shell: true,
  })

  let buffer = ""
  mcp.stdout.on("data", (chunk) => {
    buffer += chunk.toString()
    let lines = buffer.split("\n")
    buffer = lines.pop() || ""
    for (const line of lines) {
      try {
        const json = JSON.parse(line)
        onMessage(json)
      } catch (err) {
        console.error("JSON parse error:", err)
      }
    }
  })

  mcp.on("error", (err) => console.error("MCP process error:", err))
  mcp.on("exit", (code) => console.log(`MCP exited with code ${code}`))

  process.on("SIGINT", () => {
    console.log("Stopping MCP...")
    mcp.kill()
    process.exit()
  })

  return {
    send: (req) => mcp.stdin.write(JSON.stringify(req) + "\n"),
  }
}
