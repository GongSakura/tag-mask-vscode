import * as vscode from "vscode";
import { statusBar } from "./statusBar";
import { addTagMask, extraTagMask } from "./action";

export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage("activvvvvvvate 🔥");

  // register commend
  context.subscriptions.push(
    vscode.commands.registerCommand("tag-mask.add", addTagMask)
  );
  statusBar.command = "tag-mask.add";

  // listen file save event
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(extraTagMask)
  );

  statusBar.show();
}

export function deactivate() {}
