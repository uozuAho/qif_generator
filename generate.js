function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateDescription() {
  return 'Coles';
}

function generateRandomTransaction(startDate, endDate) {
  return {
    date: randomDate(startDate, endDate),
    amount: (Math.random() - 0.5) * 5000,
    description: generateDescription()
  };
}

function* generateRandomTransactions(howMany, startDate, endDate) {
  for (let i = 0; i < howMany; i++) {
    yield generateRandomTransaction(startDate, endDate);
  }
}

function formatDateToDDMMYY(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}/${month}/${year}`;
}

function transactionToQifString(transaction) {
  return `D${formatDateToDDMMYY(transaction.date)}\n`
    + `T${transaction.amount.toFixed(2)}\n`
    + `N1\n`
    + `P${transaction.description}\n`
    + '^';
}

function generateQifOutput(transactions) {
  console.log('!Type:Bank');
  for (const trans of transactions) {
    console.log(transactionToQifString(trans));
  }
}

generateQifOutput(
  generateRandomTransactions(2, new Date(2019, 1, 1), new Date(2020, 10, 30)));
