export function padWallet(address) {
    return address.toLowerCase().replace("0x", "").padStart(64, "0")
  }
  