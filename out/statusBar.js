"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusBar = exports.WATCH_OFF = exports.WATCH_ON = void 0;
const vscode_1 = require("vscode");
const name = "tag-mask";
exports.WATCH_ON = "$(eye-watch) " + name;
exports.WATCH_OFF = "$(eye-closed) " + name;
exports.statusBar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, -1);
exports.statusBar.name = name;
exports.statusBar.text = exports.WATCH_ON;
//# sourceMappingURL=statusBar.js.map