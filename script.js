let totalIncome = 0;
let totalExpense = 0;
let serialNumberCounter = 1;

function openExpensePopup() {
    document.getElementById("expensePopup").style.display = "flex";
}

function openIncomePopup() {
    document.getElementById("incomePopup").style.display = "flex";
}

function closeExpensePopup() {
    document.getElementById("expensePopup").style.display = "none";
}

function closeIncomePopup() {
    document.getElementById("incomePopup").style.display = "none";
}

// Function to update the net balance (profit/loss)
function updateNetBalance() {
    const net = totalIncome - totalExpense;
    const balanceBox = document.getElementById("net-balance");

    if (net > 0) {
        balanceBox.innerText = `+₹${net.toFixed(2)}`;
        balanceBox.style.color = "green";
    } else if (net < 0) {
        balanceBox.innerText = `-₹${Math.abs(net).toFixed(2)}`;
        balanceBox.style.color = "red";
    } else {
        balanceBox.innerText = `₹0.00`;
        balanceBox.style.color = "black";
    }
}

function submitTransaction(type) {
    let amountInput, noteInput, dateInput;
    let amount, note, date;

    if (type === "income") {
        amountInput = document.querySelector(".income-amount-row-pop-up input");
        noteInput = document.querySelector(".income-note-row-pop-up input");
        dateInput = document.querySelector(".income-date-row-pop-up input");
    } else {
        amountInput = document.querySelector(".expense-amount-row-pop-up input");
        noteInput = document.querySelector(".expense-note-row-pop-up input");
        dateInput = document.querySelector(".expense-date-row-pop-up input");
    }

    amount = amountInput.value.trim();
    note = noteInput.value.trim();
    date = dateInput.value.trim();

    if (amount === "" || note === "" || date === "") {
        alert("Please fill in all fields!");
        return;
    }

    const transactionRow = document.createElement("div");
    transactionRow.className = "expenses-and-income-entries";

    const serialDiv = document.createElement("div");
    serialDiv.className = "serial-number";
    serialDiv.innerText = `${serialNumberCounter})`;

    const noteDiv = document.createElement("div");
    noteDiv.className = "transaction-category";
    noteDiv.innerText = note;

    const dateDiv = document.createElement("div");
    dateDiv.className = "transaction-date";
    dateDiv.innerText = date;

    const valueDiv = document.createElement("div");
    valueDiv.className = "transaction-value";
    let transactionAmount = parseFloat(amount);

    if (isNaN(transactionAmount)) {
        alert("Please enter a valid number for the amount!");
        return;
    }

    if (type === "income") {
        valueDiv.innerText = `+ ₹${transactionAmount.toFixed(2)}`;
        valueDiv.style.color = "#30E05F";
        totalIncome += transactionAmount;
        closeIncomePopup();
    } else {
        valueDiv.innerText = `- ₹${transactionAmount.toFixed(2)}`;
        valueDiv.style.color = "red";
        totalExpense += transactionAmount;
        closeExpensePopup();
    }

    const cancelIcon = document.createElement("img");
    cancelIcon.src = "Images/cancel_icon.png";
    cancelIcon.className = "icon-image";
    cancelIcon.onclick = () => {
        const valueText = valueDiv.innerText;
        const removedAmount = parseFloat(valueText.replace(/[^\d.-]/g, '')); // Extract number
        if (valueText.includes("+")) {
            totalIncome -= removedAmount;
        } else if (valueText.includes("-")) {
            totalExpense -= removedAmount;
        }
        transactionRow.remove();
        updateSerialNumbers();
        updateNetBalance();
    };

    transactionRow.appendChild(serialDiv);
    transactionRow.appendChild(noteDiv);
    transactionRow.appendChild(dateDiv);
    transactionRow.appendChild(valueDiv);
    transactionRow.appendChild(cancelIcon);

    document.querySelector(".transaction-list").appendChild(transactionRow);

    // Clear inputs
    amountInput.value = "";
    noteInput.value = "";
    dateInput.value = "";

    updateNetBalance();
    serialNumberCounter++;
}

function updateSerialNumbers() {
    const allRows = document.querySelectorAll(".expenses-and-income-entries");
    allRows.forEach((row, index) => {
        const serialDiv = row.querySelector(".serial-number");
        serialDiv.innerText = `${index + 1})`;
    });
    serialNumberCounter = allRows.length + 1;
}

// Initial calculation (optional, if you have initial data or want to start at zero)
updateNetBalance();