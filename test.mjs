import { parse } from "@babel/parser";

const content = `import React from "react";

function Baa({ propA, propB }: { propA: string; propB: boolean }) {
  return (
    <div>
      {propA}
      {propB}
    </div>
  );
}
function Bab({ propA, propB }: { propA: string; propB: boolean }) {
  return (
    <div>
      {propA}
      {propB}
    </div>
  );
}
function Bac({ propA, propB }: { propA: string; propB: boolean }) {
  return (
    <div>
      {propA}
      {propB}
    </div>
  );
}

function App() {
  return <abc:div    className="123"   ><Bac className={123}></Bac>123123</abc:div>

}

/*
*(property) JSX.IntrinsicElements.div:
 React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, 
 HTMLDivElement>
*/

/**
 * Type '{ children: string; }' 
 * is missing the following properties from type 
 * '{ propA: string; propB: boolean; }': propA, propB
 */'

`;

const ast = parse(content, {
  sourceType: "module",
  plugins: ["jsx", "typescript"],
});
console.info(`ast:`, ast);
