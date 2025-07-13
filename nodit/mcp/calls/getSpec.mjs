export function getEthGetLogsSpec(send) {
    send({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "get_nodit_api_spec",
        arguments: { operationId: "eth_getLogs" },
      },
    })
  }
  