function insertSymbol(symbol) {
    const expressionField = document.getElementById('expression');
    expressionField.value += symbol;
    expressionField.focus();  // Сразу после вставки символа устанавливаем фокус на поле ввода
}

function deleteLastSymbol() {
    const expressionField = document.getElementById('expression');
    expressionField.value = expressionField.value.slice(0, -1);
    expressionField.focus();  // После удаления фокус остаётся на поле ввода
}

function replaceSquareSymbols(expression) {
    // Регулярное выражение для поиска всех степеней
    return expression.replace(/(\d+)([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, function(match, base, exponents) {
        let exp = '';
        // Заменяем каждый символ на соответствующее число
        for (let i = 0; i < exponents.length; i++) {
            exp += '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(exponents.charAt(i));
        }
        return `${base}**${exp}`;
    });
}

function formatResult(result) {
    // Регулярное выражение для замены ** на степени в верхнем регистре
    return result.replace(/(\d+)\*\*(\d+)/g, function(match, base, exponent) {
        let expSymbols = '';
        // Заменяем каждую цифру в экспоненте на соответствующий символ
        for (let i = 0; i < exponent.length; i++) {
            expSymbols += '⁰¹²³⁴⁵⁶⁷⁸⁹'.charAt(exponent.charAt(i));
        }
        return `${base}${expSymbols}`;
    });
}

function calculateExpression() {
    try {
        let expression = document.getElementById('expression').value;
        // Проверяем, если уравнение содержит '='
        if (expression.includes('=')) {
            let sides = expression.split('=');
            let leftSide = algebra.parse(sides[0]);
            let rightSide = algebra.parse(sides[1]);
            let equation = new algebra.Equation(leftSide, rightSide);

            // Находим все переменные в уравнении
            let variables = equation.lhs.terms.map(term => term.variables)
                .concat(equation.rhs.terms.map(term => term.variables))
                .flat()
                .filter((v, i, a) => a.indexOf(v) === i);  // Убираем дубликаты

            // Решаем уравнение для каждой переменной и выводим результаты
            let result = variables.map(variable => {
                let solution = equation.solveFor(variable);
                return `${variable} = ${solution.toString()}`;
            }).join(', ');

            document.getElementById('result').value = result;
        } else {
            // Обычное вычисление выражения
            expression = replaceSquareSymbols(expression);
            let result = eval(expression);
            document.getElementById('result').value = formatResult(result.toString());
        }
    } catch (error) {
        document.getElementById('result').value = "Error";
    }
}
