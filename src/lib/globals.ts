// p5play は p5 と planck(物理エンジン)をグローバル変数として参照するため、
// p5play を import する前にこのモジュールで window に公開しておく。
import p5 from 'p5';
import * as planck from 'p5play/planck.min.js';

Object.assign(window, { p5, planck });
