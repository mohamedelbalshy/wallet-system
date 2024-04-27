document.addEventListener('DOMContentLoaded', async function () {
  const stripe = Stripe('pk_test_iNCUFkORZKlPDKU9SlAwRWKK');
  const elements = stripe.elements();

  const cardElement = elements.create('card', {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '30px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '15px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  });
  cardElement.mount('#card-element');

  const paymentForm = document.getElementById('payment-form');
  const submitButton = document.getElementById('submit-button');
  const paymentStatus = document.getElementById('payment-status');
  const amount = document.getElementById('amount').value;
  const userId = document.getElementById('userId').value;

  paymentForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    submitButton.disabled = true;
    paymentStatus.textContent = 'Processing payment...';
    const paymentInitRes = await fetch(
      'https://game-flounder-hardly.ngrok-free.app/payments',
      {
        method: 'POST',
        body: JSON.stringify({
          amount: parseInt(amount),
          currency: 'USD',
          userId,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const paymentInit = await paymentInitRes.json();
    console.log(paymentInit);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      paymentInit.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      },
    );

    if (error) {
      paymentStatus.textContent = `Payment failed: ${error.message}`;
      submitButton.disabled = false;
    } else {
      console.log(paymentIntent);
      paymentStatus.textContent = `Payment successful: ${paymentIntent.id}`;
    }
  });
});
