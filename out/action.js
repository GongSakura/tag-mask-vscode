"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTagMask = exports.extraTagMask = void 0;
const vscode_1 = require("vscode");
const node_html_parser_1 = require("node-html-parser");
const extraTagMask = () => { };
exports.extraTagMask = extraTagMask;
const addTagMask = () => {
    const editor = vscode_1.window.activeTextEditor;
    if (editor) {
        const { document } = editor;
        // console.info(`processedContent:`, content);
        editor.edit((editBuilder) => {
            const rawContent = document.getText();
            const content = processContent(rawContent);
            const range = new vscode_1.Range(document.positionAt(0), document.positionAt(rawContent.length));
            console.info(`range:`, range);
            editBuilder.replace(range, content);
        });
    }
};
exports.addTagMask = addTagMask;
function processContent(content) {
    const root = (0, node_html_parser_1.parse)(content);
    function search(node) {
        node.childNodes.forEach((child) => {
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
//# sourceMappingURL=action.js.map