import { format } from "date-fns";

export async function GET() {
  const headers = {
    "X-API-KEY": process.env.NODIT_API_KEY!,
    "Content-Type": "application/json",
  };

  const now = new Date();
  const endUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1 // yesterday
  ));
  const startUTC = new Date(endUTC.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days before end

  const formatDateUTC = (d: Date) => format(d, "yyyy-MM-dd-00"); // daily format: hour always 00

  const body = JSON.stringify({
    startDateTime: formatDateUTC(startUTC),
    endDateTime: formatDateUTC(endUTC),
  });

  console.log("📤 Fetching DAILY network stats with body:", body);

  const [txRes, accRes] = await Promise.all([
    fetch(
      "https://web3.nodit.io/v1/ethereum/mainnet/stats/getDailyTransactionsStats",
      { method: "POST", headers, body }
    ),
    fetch(
      "https://web3.nodit.io/v1/ethereum/mainnet/stats/getDailyActiveAccountsStats",
      { method: "POST", headers, body }
    ),
  ]);

  const txData = await txRes.json();
  const accData = await accRes.json();

  console.log("✅ TX Stats Response:", txData);
  console.log("✅ ACC Stats Response:", accData);

  return Response.json({
    txStats: txData.items ?? [],
    accStats: accData.items ?? [],
    timestamp: Date.now(),
  });
}
