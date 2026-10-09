# p5_type

TypeScript で [p5.js](https://p5js.org/) と [p5play](https://p5play.org/) を使うための開発環境です。
ビルドツールには [Vite](https://vite.dev/) を使っています。

## 使い方

```bash
npm install        # 依存パッケージのインストール
npm run dev        # 開発サーバー起動 (http://localhost:5173) — 保存すると自動リロード
npm run build      # 型チェック + 本番ビルド (dist/ に出力)
npm run preview    # ビルド結果の確認
npm run typecheck  # 型チェックのみ
```

## 構成

```
index.html            エントリ HTML
src/main.ts           スケッチ本体 (setup / draw を書く場所)
src/style.css         ページのスタイル
src/lib/globals.ts    p5 と planck を window に公開する
src/lib/p5play.ts     globals.ts → p5play の順に読み込む
types/global.d.ts     window.setup / window.draw などの型
types/modules.d.ts    planck.min.js のモジュール宣言
types/q5-stub.d.ts    p5play.d.ts 内の `import 'q5'` を無効化するスタブ
```

## スケッチの書き方

`src/main.ts` の先頭で `./lib/p5play` を import し、`setup` / `draw` を `window` に登録します
(p5 の「グローバルモード」)。`createCanvas`・`background` などの p5 関数や、`Sprite`・`Group`・
`world`・`kb`・`mouse` などの p5play の API は import なしで型付きで使えます。

```ts
import './lib/p5play';

let player: Sprite;

window.setup = () => {
  new Canvas(400, 400);
  world.gravity.y = 10;
  player = new Sprite(200, 100, 50, 50);
  new Sprite(200, 380, 400, 40, STATIC);
};

window.draw = () => {
  background(220);
  if (kb.pressing('left')) player.vel.x = -3;
  if (kb.pressing('right')) player.vel.x = 3;
};
```

## バージョンについての注意

- **p5.js は 1.11.4 に固定**しています。p5play v3 が対応している p5.js は 1.10.0〜1.11.4 だけで、
  p5.js 2.x を入れるとコンソールに非対応エラーが出ます。
- 型定義は p5.js 用に `@types/p5` (グローバル版 `p5/global`) を、p5play 用にはパッケージ同梱の
  `p5play.d.ts` を使っています。p5play.d.ts は q5.js の型を読み込もうとするので、
  `tsconfig.json` の `paths` で空のスタブに差し替えています。
- p5play.d.ts には一部不正確な型があります (例: `Group.color` が `number` になっている)。
  型エラーが出たときは、個々の `Sprite` に設定するなどで回避してください。
- p5play のライセンスは「p5play Personal License」です。商用利用などは
  [p5play.org](https://p5play.org/) の条件を確認してください。
