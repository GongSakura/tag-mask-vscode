"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const statusBar_1 = require("./statusBar");
const action_1 = require("./action");
function activate(context) {
    vscode.window.showInformationMessage("activvvvvvvate 🔥");
    // register commend
    context.subscriptions.push(vscode.commands.registerCommand("tag-mask.add", action_1.addTagMask));
    statusBar_1.statusBar.command = "tag-mask.add";
    // listen file save event
    context.subscriptions.push(vscode.workspace.onWillSaveTextDocument(action_1.extraTagMask));
    statusBar_1.statusBar.show();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map