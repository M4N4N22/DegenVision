export async function fetchLiveEthPrice() {
    const res = await fetch('/api/eth-price', {
      cache: 'no-store',
    })
  
    if (!res.ok) throw new Error('Failed to fetch ETH price')
  
    const data = await res.json()
    return data.price
  }
  