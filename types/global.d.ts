export {};

declare global {
  interface Window {
    // p5 のグローバルモードは window 上のこれらの関数を探して呼び出す
    preload?: () => void;
    setup?: () => void;
    draw?: () => void;
    windowResized?: () => void;
  }
}
