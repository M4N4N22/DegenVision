export function listApiCategories(send) {
    send({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "list_nodit_node_apis",
        arguments: { category: "ethereum" },
      },
    })
  }
  