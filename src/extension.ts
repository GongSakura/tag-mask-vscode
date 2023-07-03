import * as vscode from "vscode";
import { statusBar } from "./statusBar";
import { addTagMask, removeTagMask } from "./action";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("activvvvvvvate 🔥");

  // register commend
  context.subscriptions.push(
    vscode.commands.registerCommand("tag-mask.run", addTagMask)
  );
  statusBar.command = "tag-mask.run";

  // listen file save event
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(removeTagMask)
  );

  statusBar.show();
}

export function deactivate() {}
