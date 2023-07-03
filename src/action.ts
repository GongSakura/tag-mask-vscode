import { Range, TextDocumentWillSaveEvent, window } from "vscode";
import { processContent, restoreContent } from "./core";


export const removeTagMask = (e: TextDocumentWillSaveEvent) => {

  const editor = window.activeTextEditor;
  if (editor) {
    const { document } = editor;

    editor.edit((editBuilder) => {
       // 1. process
      const rawContent = `${document.getText()}`;
      const processedContent = restoreContent(rawContent);

      //  2. replace
      const range = new Range(
        document.positionAt(0),
        document.positionAt(rawContent.length)
      );
      editBuilder.replace(range, processedContent);
    });
  }
};


export const addTagMask = () => {
  const editor = window.activeTextEditor;
  if (editor) {
    const { document } = editor;

    editor.edit((editBuilder) => {
       // 1. process
      const rawContent = `${document.getText()}`;
      const processedContent = processContent(rawContent);

      //  2. replace
      const range = new Range(
        document.positionAt(0),
        document.positionAt(rawContent.length)
      );
      editBuilder.replace(range, processedContent);
    });
  }
};

