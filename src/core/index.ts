import { parse } from "@babel/parser";
import generate from "@babel/generator";

import { JSXElement, isJSXElement } from "@babel/types";

export function processContent(content: string) {
  const ast = generateAST(content);
  if (ast === undefined) {
    return content;
  }

  traverseAST(ast.program, "do");
  return generate(ast, {
    retainLines: true,
  }).code;
}

export function restoreContent(content: string) {
  const ast = generateAST(content);
  console.info(`  ast:`, ast);
  if (ast === undefined) {
    return content;
  }

  traverseAST(ast.program, "undo");
  try {
    const code = generate(ast, {
      retainLines: true,
    }).code;
    return code;
  } catch (error) {
    return content;
  }
}

function generateAST(content: string) {
  try {
    const ast = parse(content, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });
    return ast;
  } finally {
  }
}

/**
 * step1: forEach jsxElement, check className
 * step2: forEach jsxElement's children, go step1
 * @param node
 */
function traverseAST(node: any, mode: TransformMode) {
  if (isJSXElement(node)) {
    node.children.forEach((e: any) => {
      traverseAST(e, mode);
    });
    transformTag(node, mode);
  } else if (Array.isArray(node.body)) {
    node.body.forEach((e: any) => {
      traverseAST(e, mode);
    });
  } else if (node.body) {
    traverseAST(node.body, mode);
  } else if (node?.argument) {
    traverseAST(node.argument, mode);
  }
}

type TransformMode = "do" | "undo";
function transformTag(node: JSXElement, mode: TransformMode) {
  const openTag = node.openingElement;

  if (mode === "do") {
    const rawTagName =
      openTag.name.type === "JSXIdentifier" ? openTag.name.name : "";
    let semanticTagName: string = rawTagName;
    if (rawTagName && rawTagName.indexOf(":") < 0 && openTag.attributes) {
      openTag.attributes.forEach((attribute: any) => {
        if (attribute?.name && attribute?.name?.name === "className") {
          const className = generate(attribute).code;
          const match =
            className.match(/[a-z][a-z-]+(__[a-z-]+)+(--[a-z]+)?/g) || [];
          if (match.length) {
            semanticTagName = match[0] + ":" + rawTagName;
          }
        }
      });

      if (openTag.name.type === "JSXIdentifier") {
        openTag.name.name = semanticTagName;

        const closeTag = node.closingElement;
        if (closeTag?.name.type === "JSXIdentifier") {
          closeTag.name.name = semanticTagName;
        }
      }
    }
  } else {
    if (openTag.name.type === "JSXNamespacedName") {
      if (
        /[a-z][a-z-]+(__[a-z-]+)+(--[a-z]+)?/g.test(openTag.name.namespace.name)
      ) {
  
        (openTag.name as any) = openTag.name.name;
        const closeTag = node.closingElement as any;
        (closeTag.name as any) = closeTag.name.name;
      }
    }
  }
}
