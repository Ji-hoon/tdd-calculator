const clickDigitButtons = (digits = []) => {
  digits.forEach((digit) => {
    cy.get(".digit").contains(digit).click();
  });
};

const clickOperationButton = (operation) => {
  cy.get(".operation").contains(operation).click();
};

const checkDisplayValue = (value) => {
  cy.get("#total").should("have.text", value);
};

describe("calculator app test", () => {
  beforeEach("go to init page", () => {
    cy.visit("../../index.html");
  });

  it("should be displayed 0", () => {
    checkDisplayValue("0");
  });

  it("shoule be displayed the number that clicked one number", () => {
    clickDigitButtons(["1"]);
    checkDisplayValue("1");
  });

  it("should be displayed the combined number that clicked two numbers", () => {
    clickDigitButtons(["1", "2"]);
    checkDisplayValue("12");
  });

  it("should be displayed the operator that clicked", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("+");
    checkDisplayValue("123+");
  });

  it("should be displayed the operator that last clicked", () => {
    clickDigitButtons(["1", "2", "3", "4"]);
    clickOperationButton("+");
    clickOperationButton("-");
    checkDisplayValue("123-");
  });

  it("should be displayed the numbers after operator that clicked", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("+");
    clickDigitButtons(["4", "5", "6", "7"]);
    checkDisplayValue("123+456");
  });

  it("should be displayed 'ADDITION' calculation result when equal operation button", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("+");
    clickDigitButtons(["4", "5", "6"]);
    clickOperationButton("=");
    checkDisplayValue("579");
  });

  it("should be displayed 'MULTIPLICATION' calculation result when equal operation button", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("X");
    clickDigitButtons(["4", "5", "6"]);
    clickOperationButton("=");
    checkDisplayValue("56088");
  });

  it("should be displayed 'DIVISION' calculation result when equal operation button", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("/");
    clickDigitButtons(["4", "5", "6"]);
    clickOperationButton("=");
    checkDisplayValue("0");
  });

  it("should be displayed 'SUBTRACTION' calculation result when equal operation button", () => {
    clickDigitButtons(["1", "2", "3"]);
    clickOperationButton("-");
    clickDigitButtons(["4", "5", "6"]);
    clickOperationButton("=");
    checkDisplayValue("-333");
  });

  it("should be reset desplay when click the AC button", () => {
    clickDigitButtons(["1", "2", "3"]);
    cy.get(".modifier").click();
    checkDisplayValue("0");
  });
});
