import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages などサブディレクトリに置く場合も動くよう相対パスで出力
  base: './',
  build: {
    // p5.js + p5play + planck で 1MB 超になるため警告の閾値を上げる
    chunkSizeWarningLimit: 2000,
  },
});
