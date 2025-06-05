// TradingViewWidget.tsx
"use client";
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear previous widget if any (helps with React strict mode or hot reload)
    container.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "COINBASE:ETHUSD",   // ETH price from Coinbase
      interval: "1",               // 5 min candles
      timezone: "Etc/UTC",
      theme: "dark",
      style: "3",                 // candlestick style
      locale: "en",
      "hide_top_toolbar": true,
      "hide_volume": true,
      backgroundColor: "rgba(0, 0, 0, 1)",
      gridColor: "rgba(255, 255, 255, 0.1)", // subtle grid lines in white
      allow_symbol_change: false,
      support_host: "https://www.tradingview.com"
      
    });

    container.current.appendChild(script);
  }, []);

  return (
<div
  className=" overflow-hidden shadow-lg"
  ref={container}
  style={{ height: 350, width: '100%' }}
>

    </div>
  );
}

export default memo(TradingViewWidget);
