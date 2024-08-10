function insertSymbol(symbol) {
    document.getElementById('expression').value += symbol;
}

function replaceSquareSymbols(expression) {
    return expression
        .replace(/¹/g, '**1')
        .replace(/²/g, '**2')
        .replace(/³/g, '**3')
        .replace(/⁴/g, '**4')
        .replace(/⁵/g, '**5')
        .replace(/⁶/g, '**6')
        .replace(/⁷/g, '**7')
        .replace(/⁸/g, '**8')
        .replace(/⁹/g, '**9')
        .replace(/¹⁰/g, '**10');
}

function formatResult(result) {
    return result
        .replace(/\*\*1/g, '¹')
        .replace(/\*\*2/g, '²')
        .replace(/\*\*3/g, '³')
        .replace(/\*\*4/g, '⁴')
        .replace(/\*\*5/g, '⁵')
        .replace(/\*\*6/g, '⁶')
        .replace(/\*\*7/g, '⁷')
        .replace(/\*\*8/g, '⁸')
        .replace(/\*\*9/g, '⁹')
        .replace(/\*\*0/g, '⁰');
}

function calculateExpression() {
    try {
        let expression = document.getElementById('expression').value;
        expression = replaceSquareSymbols(expression);
        let result = eval(expression);
        document.getElementById('result').value = formatResult(result.toString());
    } catch (error) {
        document.getElementById('result').value = "Error";
    }
}
