import {
  Range,
  TextDocument,
  TextDocumentWillSaveEvent,
  window,
  Position,
} from "vscode";
import { statusBar, WATCH_OFF, WATCH_ON } from "./statusBar";
import { HTMLElement, parse } from "node-html-parser";


export const extraTagMask = () => {};
export const addTagMask = () => {
  const editor = window.activeTextEditor;
  if (editor) {
    const { document } = editor;
    // console.info(`processedContent:`, content);
    editor.edit((editBuilder) => {
      const rawContent = document.getText();

      const content = processContent(rawContent);
      const range = new Range(
        document.positionAt(0),
        document.positionAt(rawContent.length)
      );
      console.info(`range:`,range)
      editBuilder.replace(range, content);
    });
  }
};

function processContent(content: string) {
  const root = parse(content);

  function search(node: HTMLElement) {
    node.childNodes.forEach((child: any) => {
      if (child.nodeType === 1) {
        search(child);
      }
    });

    if (node?.nodeType === 1 && node?.rawTagName?.indexOf(":") < 0) {
      let className = node.rawAttributes.className;

      if (className) {
        const matchResult = className.match(/[\w-]+(__[\w-]+)*(--[\w-]+)?/);
        if (matchResult) {
          node.rawTagName = `${matchResult[0]}:${node.rawTagName}`;
        }
      }
    }
  }

  search(root);
  return root.toString();
}

// export function modifyStringInTextEdit() {
//   const editor = window.activeTextEditor;

//   if (editor) {
//     const { document } = editor;
//     editor.edit(editBuilder => {
//       const startPosition = new Position(0, 0); // Specify the starting position of the text to modify
//       const endPosition = new Position(0, 5); // Specify the ending position of the text to modify
//       const range = new Range(startPosition, endPosition);
//       const modifiedText = 'Modified'; // The modified string

//       // Replace the original text with the modified text in the given range
//       editBuilder.replace(range, modifiedText);
//     });
//   }
// }
