'use client';

import { useEffect, useRef, memo } from 'react';

interface TradingViewTickerProps {
  colorTheme?: 'light' | 'dark';
}

// Ticker Tape - 실시간 티커 테이프
export const TradingViewTicker = memo(function TradingViewTicker({
  colorTheme = 'light'
}: TradingViewTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'COMEX:GC1!', title: 'Gold' },
        { proName: 'COMEX:HG1!', title: 'Copper' },
        { proName: 'NYMEX:CL1!', title: 'Crude Oil' },
        { proName: 'TVC:SILVER', title: 'Silver' },
        { proName: 'TVC:PLATINUM', title: 'Platinum' },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'adaptive',
      colorTheme: colorTheme,
      locale: 'en',
    });

    containerRef.current.appendChild(script);
  }, [colorTheme]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

interface TradingViewMiniChartProps {
  symbol: string;
  width?: string | number;
  height?: string | number;
  colorTheme?: 'light' | 'dark';
  dateRange?: '1D' | '1M' | '3M' | '12M' | '60M' | 'ALL';
  isTransparent?: boolean;
}

// Mini Symbol Overview - 미니 심볼 차트
export const TradingViewMiniChart = memo(function TradingViewMiniChart({
  symbol,
  width = '100%',
  height = 220,
  colorTheme = 'light',
  dateRange = '12M',
  isTransparent = false,
}: TradingViewMiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      height: height,
      locale: 'en',
      dateRange: dateRange,
      colorTheme: colorTheme,
      isTransparent: isTransparent,
      autosize: false,
      largeChartUrl: '',
    });

    containerRef.current.appendChild(script);
  }, [symbol, width, height, colorTheme, dateRange, isTransparent]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

interface TradingViewSymbolOverviewProps {
  symbols: [string, string][];
  width?: string | number;
  height?: string | number;
  colorTheme?: 'light' | 'dark';
}

// Symbol Overview - 심볼 개요 (다중 심볼)
export const TradingViewSymbolOverview = memo(function TradingViewSymbolOverview({
  symbols,
  width = '100%',
  height = 400,
  colorTheme = 'light',
}: TradingViewSymbolOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: symbols,
      chartOnly: false,
      width: width,
      height: height,
      locale: 'en',
      colorTheme: colorTheme,
      autosize: false,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: 'right',
      scaleMode: 'Normal',
      fontFamily: '-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif',
      fontSize: '10',
      noTimeScale: false,
      valuesTracking: '1',
      changeMode: 'price-and-percent',
      chartType: 'area',
      lineWidth: 2,
      lineType: 0,
      dateRanges: ['1d|1', '1m|30', '3m|60', '12m|1D', '60m|1W', 'all|1M'],
    });

    containerRef.current.appendChild(script);
  }, [symbols, width, height, colorTheme]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

interface TradingViewMarketOverviewProps {
  width?: string | number;
  height?: string | number;
  colorTheme?: 'light' | 'dark';
}

// Market Overview - 시장 개요
export const TradingViewMarketOverview = memo(function TradingViewMarketOverview({
  width = '100%',
  height = 660,
  colorTheme = 'light',
}: TradingViewMarketOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: colorTheme,
      dateRange: '12M',
      showChart: true,
      locale: 'en',
      width: width,
      height: height,
      largeChartUrl: '',
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      plotLineColorGrowing: 'rgba(201, 169, 98, 1)',
      plotLineColorFalling: 'rgba(201, 169, 98, 1)',
      gridLineColor: 'rgba(240, 243, 250, 0)',
      scaleFontColor: 'rgba(106, 109, 120, 1)',
      belowLineFillColorGrowing: 'rgba(201, 169, 98, 0.12)',
      belowLineFillColorFalling: 'rgba(201, 169, 98, 0.12)',
      belowLineFillColorGrowingBottom: 'rgba(201, 169, 98, 0)',
      belowLineFillColorFallingBottom: 'rgba(201, 169, 98, 0)',
      symbolActiveColor: 'rgba(201, 169, 98, 0.12)',
      tabs: [
        {
          title: 'Commodities',
          symbols: [
            { s: 'COMEX:GC1!', d: 'Gold' },
            { s: 'COMEX:HG1!', d: 'Copper' },
            { s: 'NYMEX:CL1!', d: 'Crude Oil WTI' },
            { s: 'NYMEX:BZ1!', d: 'Crude Oil Brent' },
            { s: 'TVC:SILVER', d: 'Silver' },
            { s: 'TVC:PLATINUM', d: 'Platinum' },
          ],
          originalTitle: 'Commodities',
        },
      ],
    });

    containerRef.current.appendChild(script);
  }, [width, height, colorTheme]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});

interface TradingViewSingleTickerProps {
  symbol: string;
  width?: string | number;
  colorTheme?: 'light' | 'dark';
  isTransparent?: boolean;
}

// Single Ticker - 단일 티커
export const TradingViewSingleTicker = memo(function TradingViewSingleTicker({
  symbol,
  width = '100%',
  colorTheme = 'light',
  isTransparent = false,
}: TradingViewSingleTickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      isTransparent: isTransparent,
      colorTheme: colorTheme,
      locale: 'en',
    });

    containerRef.current.appendChild(script);
  }, [symbol, width, colorTheme, isTransparent]);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
});
