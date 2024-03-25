document.addEventListener("DOMContentLoaded", function () {
  window.updateTerms = updateTerms;
  updateTerms();
});

function updateTerms() {
  var depositType = document.getElementById("depositType").value;
  var depositTermSelect = document.getElementById("depositTerm");
  depositTermSelect.innerHTML = "";

  var terms = [];

  if (depositType === "popolnyaemy") {
    terms = ["6 месяцев", "1 год", "1,5 года", "2 года"];
  } else if (depositType === "srochnyy") {
    terms = [
      "3 месяца",
      "6 месяцев",
      "9 месяцев",
      "1 год",
      "1,5 года",
      "2 года",
    ];
  }

  for (var i = 0; i < terms.length; i++) {
    var option = document.createElement("option");
    option.text = terms[i];
    depositTermSelect.add(option);
  }
}

window.calculate = calculate;

function calculate() {
  var depositType = document.getElementById("depositType").value;
  var depositTerm = document.getElementById("depositTerm").value;
  var depositAmount = parseFloat(
    document.getElementById("depositAmount").value
  );

  if (isNaN(depositAmount) || depositAmount <= 0) {
    document.getElementById("result").innerHTML =
      "Пожалуйста, введите корректную сумму вклада.";
    return;
  }

  var interestRates = {
    popolnyaemy: {
      "6 месяцев": 0.2 / 2,
      "1 год": 0.22,
      "1,5 года": 0.15 * (3 / 2),
      "2 года": 0.1 * 2,
    },
    srochnyy: {
      "3 месяца": 0.2 / 4,
      "6 месяцев": 0.22 / 2,
      "9 месяцев": 0.23 * (3 / 4),
      "1 год": 0.24,
      "1,5 года": 0.18 * (3 / 2),
      "2 года": 0.15 * 2,
    },
  };

  if (!interestRates[depositType] || !interestRates[depositType][depositTerm]) {
    document.getElementById("result").innerHTML =
      "Выбран некорректный тип вклада или срок.";
    return;
  }

  var annualInterestRate = interestRates[depositType][depositTerm];
  var totalAmount = depositAmount + depositAmount * annualInterestRate;

  var depositTypeName =
    depositType === "popolnyaemy" ? "Пополняемый" : "Срочный";

  document.getElementById("result").innerHTML =
    "Вы выбрали " +
    depositTypeName +
    " вклад на срок " +
    depositTerm +
    ". Итоговая сумма в конце срока: " +
    totalAmount.toFixed(2) +
    ".";
}
