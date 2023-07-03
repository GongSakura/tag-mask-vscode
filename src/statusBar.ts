import { StatusBarAlignment, StatusBarItem, window } from "vscode";

const name = "Tag Mask";
export const statusBar: StatusBarItem = window.createStatusBarItem(
  StatusBarAlignment.Right,
  -1
);

statusBar.name = name;
statusBar.text = name;
