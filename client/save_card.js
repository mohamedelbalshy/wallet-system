document.addEventListener('DOMContentLoaded', function () {
  var stripe = Stripe('pk_test_iNCUFkORZKlPDKU9SlAwRWKK');

  var elements = stripe.elements();
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

  var form = document.getElementById('payment-form');
  const userId = document.getElementById('userId').value;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    stripe.createToken(cardElement).then(async function (result) {
      if (result.error) {
        console.error('Error:', result.error.message);
      } else {
        console.log(result.token);
        const createCardRes = await fetch(
          'https://game-flounder-hardly.ngrok-free.app/payments/card',
          {
            method: 'POST',
            body: JSON.stringify({
              brand: result.token.card.brand,
              externalId: result.token.id,
              last4: result.token.card.last4,
              expMonth: result.token.card.exp_month,
              expYear: result.token.card.exp_year,
              userId,
            }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );

        const createCard = await createCardRes.json();
        console.log(createCard);
        // You can handle the token here (e.g., send it to your server for further processing)
      }
    });
  });
});
