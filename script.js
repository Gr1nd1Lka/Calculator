function insertSymbol(symbol) {
    const expressionField = document.getElementById('expression');
    expressionField.value += symbol;
}

function deleteLastSymbol() {
    const expressionField = document.getElementById('expression');
    expressionField.value = expressionField.value.slice(0, -1);
}

function calculateExpression() {
    try {
        let expression = document.getElementById('expression').value;

        // Проверка на наличие уравнения
        if (expression.includes('=')) {
            // Удаляем пробелы для корректной работы
            expression = expression.replace(/\s+/g, '');

            let sides = expression.split('=');
            let leftSide = sides[0];
            let rightSide = sides[1];

            // Преобразуем выражение для корректной интерпретации algebra.js
            leftSide = algebra.parse(leftSide);
            rightSide = algebra.parse(rightSide);

            // Создаем уравнение и решаем его
            let equation = new algebra.Equation(leftSide, rightSide);
            let solution = equation.solveFor("x");

            document.getElementById('result').value = `x = ${solution.toString()}`;
        } else {
            // Обычное вычисление выражения
            let result = eval(expression);
            document.getElementById('result').value = result.toString();
        }
    } catch (error) {
        console.error(error);
        document.getElementById('result').value = "Incorrect expression";
    }
}

const translations = {
    en: {
        expressionPlaceholder: "Enter expression",
        resultPlaceholder: "Result",
        equalButton: "=",
        deleteButton: "⌦",
        numbersHeader: "Numbers",
        powersHeader: "Powers",
        incorrectExpression: "Incorrect expression",
        languageLabel: "Language"
    },
    ru: {
        expressionPlaceholder: "Введите выражение",
        resultPlaceholder: "Результат",
        equalButton: "=",
        deleteButton: "⌦",
        numbersHeader: "Числа",
        powersHeader: "Степени",
        incorrectExpression: "Некорректное выражение",
        languageLabel: "Язык"
    }
};

function switchLanguage(language) {
    const translation = translations[language];

    document.getElementById('expression').placeholder = translation.expressionPlaceholder;
    document.getElementById('result').placeholder = translation.resultPlaceholder;
    document.getElementById('calculate-btn').innerText = translation.equalButton;
    document.getElementById('delete-btn').innerText = translation.deleteButton;

    document.querySelector('.numbers h3').innerText = translation.numbersHeader;
    document.querySelector('.powers h3').innerText = translation.powersHeader;
    document.getElementById('language-label').innerText = translation.languageLabel;

    document.getElementById('result').value = "";
}

// Инициализация языка по умолчанию (например, английский)
switchLanguage('en');
