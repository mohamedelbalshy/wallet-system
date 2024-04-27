// Function to display wallet balance

document.addEventListener('DOMContentLoaded', async function () {
  await fetchBalance();
});

// Function to refresh balance
async function fetchBalance() {
  const userId = document.getElementById('userId').value;
  if (!userId) return 0;
  const walletRes = await fetch(
    `https://game-flounder-hardly.ngrok-free.app/wallets/${userId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const wallet = await walletRes.json();
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = `Balance: $${wallet.balance.toFixed(2)}`;
}
