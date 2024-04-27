async function sendMoney() {
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Validation
  if (!from || !to || isNaN(amount) || amount <= 0) {
    showMessage('Please enter valid sender ID, recipient ID, and amount.');
    return;
  }

  let sendRes = await fetch(
    'https://game-flounder-hardly.ngrok-free.app/wallets/send',
    {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  sendRes = await sendRes.json();

  console.log(sendRes);

  // Simulate sending money (replace with actual AJAX request to send money)
  // Here you can add logic to send money using your backend or API
  // For the sake of example, let's just display a success message
  showMessage(
    `Successfully sent $${amount.toFixed(2)} from User ${from} to User ${to}.`,
  );
}

function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}
