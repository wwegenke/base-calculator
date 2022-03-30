import peg from 'pegjs';
import { grammar } from '../files/MathGrammar.json';

const precision = 12;
const pegParser = peg.generate(grammar);

export const allDigits = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E',
    'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const buildExpression = (str) => {
    try {
        if (!str) return '';
        const expression = pegParser.parse(str);
        return expression;
    } catch (ex) {
        return 'Parse Error';
    }
};

const roundPrecision = (num) => {
    if (num >= -1e-7 && num <= 1e-7) return 0;
    if (num === Infinity || num === -Infinity) return num;
    return parseFloat(num.toPrecision(precision));
}

//Convert string to base 10 float
const parseBaseFloat = (str, radix) => {
    if (str === null) return NaN;
    if (str === '∞') return Infinity;
    if (str === '-∞') return -Infinity;

    const baseDigits = allDigits.slice(0, radix + 1);
    
    for (const c of str) {
        if (!baseDigits.includes(c) && c !== '.' && c !== '-') return NaN;
    }
    var parts = str.split(".");
    if (parts.length > 1)
    {
        const left = parseInt(parts[0], radix);
        const right = parseInt(parts[1], radix) / Math.pow(radix, parts[1].length) * (str[0] === '-' ? -1 : 1);
        return left + right;
    }
    return roundPrecision(parseInt(parts[0], radix));
}

const calculateExpression = (expression, base) => {
    if (expression === null) return 'NaN';

    let result = 0;
    if (typeof expression === 'object') {
        const left = parseBaseFloat(calculateExpression(expression.left, base), base);
        const right = parseBaseFloat(calculateExpression(expression.right, base), base);
        console.log(left, right);
        switch (expression.operator) {
            case '^':
                result = Math.pow(left, right);
                break;
            case '*':
                result = left * right;
                break;
            case '%':
                result = left % right;
                break;
            case '/':
                result = left / right;
                break;
            case '+':
                result = left + right;
                break;
            case '-':
                result = left - right;
                break;
            case 'sin':
                result = Math.sin(left);
                break;
            case 'cos':
                result = Math.cos(left);
                break;
            case 'tan':
                result = Math.tan(left);
                break;
        }

    } else if (expression === 'π' || expression === '-π')
        result = Math.PI * (expression[0] === '-' ? -1 : 1);
    else if (expression === 'e' || expression === '-e')
        result = Math.E * (expression[0] === '-' ? -1 : 1);
    else if (expression === '∞' || expression === '-∞')
        result = Infinity * (expression[0] === '-' ? -1 : 1);
    else
        result = parseBaseFloat(expression, base);

    if (isNaN(result)) return 'NaN';
    if (result === Infinity) return '∞';
    if (result === -Infinity) return '-∞';
    

    return roundPrecision(result).toString(base).toUpperCase();
};

export const calculate = (str, base) => {
    try {
        if (!str) return '';

        str = str.replace(/ /g, ''); //Get rid of whitespace
        const expression = buildExpression(str);
        if (expression === 'Parse Error') return expression;
        console.log(expression);
        const result = calculateExpression(expression, base);
        return result;
    } catch (ex) {
        return 'Calculate Error';
    }
}

export const convertBase = (str, fromBase, toBase) => {
    if (!str) return '';
    if (str === '∞') return '∞';
    if (str === '-∞') return '-∞';

    const baseTenNum = parseBaseFloat(str, fromBase);
    const newNumberStr = roundPrecision(baseTenNum).toString(toBase).toUpperCase();
    return newNumberStr;
}