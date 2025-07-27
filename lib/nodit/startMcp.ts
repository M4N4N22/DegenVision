// lib/nodit/startMcp.ts
import { startMCP } from "@/nodit/mcp/client.mjs";
import { trackNerdLog } from "@/shared/nerdlog.mjs";

export const initMCP = (onMessage: (msg: any) => void) => {
  const { send } = startMCP((msg: any) => {
    if (msg.error) {
      console.error("MCP error:", msg.error);
      trackNerdLog({
        source: "MCP",
        type: "error",
        error: msg.error,
        ts: Date.now(),
      });
    } else {
      trackNerdLog({
        source: "MCP",
        type: "response",
        id: msg.id,
        payload: msg.result,
        ts: Date.now(),
      });

      onMessage(msg);
    }
  });

  return { send };
};
