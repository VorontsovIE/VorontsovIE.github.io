import {OperatorNode, SymbolNode, ConstantNode} from 'mathjs';

const pow = (a,b) => new OperatorNode('^', 'pow', [a,b]);
const square = (a) => pow(a, new ConstantNode(2));
const add = (a,b) => new OperatorNode('+', 'add', [a,b]);
const mul = (a,b) => new OperatorNode('*', 'multiply', [a,b]);
const subtract = (a,b) => new OperatorNode('-', 'subtract', [a,b]);
const sum = (vals) => vals.reduce((res, cur) => add(res,cur));
const prod = (vals) => vals.reduce((res, cur) => mul(res,cur));

const polyByZeros = (zeros) => {
  const x = new SymbolNode('x');
  if (zeros.length == 0) {
    return new ConstantNode(1);
  } else {
    const monoms = zeros.map(z => (z >= 0) ? subtract(x, new ConstantNode(z)) : add(x, new ConstantNode(-z)));
    return prod(monoms);
  }
};

export {polyByZeros};
