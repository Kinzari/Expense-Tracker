/*=============== ELEMENT SELECTORS ===============*/
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/*=============== LOCAL STORAGE ===============*/
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

/*=============== EVENT LISTENERS ===============*/
// Add transaction on form submission
form.addEventListener("submit", addTransaction);

/*=============== FUNCTIONS ===============*/

/*========== Add Transaction ==========*/
function addTransaction(e) {
  e.preventDefault();

  // Validate input fields
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    // Create a transaction object
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    // Push transaction to the list and update DOM
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    // Clear form fields
    text.value = "";
    amount.value = "";
  }
}

/*========== Generate Random ID ==========*/
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

/*========== Add Transaction to DOM ==========*/
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  // Create list item
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "x";
  deleteButton.onclick = () => removeTransaction(transaction.id);

  // Set inner HTML and append delete button
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  `;
  item.appendChild(deleteButton);

  // Append list item to the history list
  list.appendChild(item);
}

/*========== Update Balance, Income, and Expense ==========*/
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // Update DOM values
  balance.innerText = `₱${total}`;
  money_plus.innerText = `₱${income}`;
  money_minus.innerText = `₱${expense}`;
}

/*========== Remove Transaction by ID ==========*/
function removeTransaction(id) {
  // Filter out the transaction by ID
  transactions = transactions.filter((transaction) => transaction.id !== id);

  // Update local storage and reinitialize the app
  updateLocalStorage();
  init();
}

/*========== Update Local Storage ==========*/
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

/*========== Initialize App ==========*/
function init() {
  list.innerHTML = ""; // Clear the list

  // Populate the list with transactions and update values
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Initialize the app
init();
