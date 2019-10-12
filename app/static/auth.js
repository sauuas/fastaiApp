// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      db.collection('guides').get().then(snapshot => {
        
        setupUI(user);
      });
    } else {
      setupUI();
      
    }
  })
  
  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');

      //stripe checkout logic
      var stripe = Stripe('pk_test_CDT54sqWOlsBKVNZJUVPg5Po00xYTB6kQ6');

          var checkoutButton = document.getElementById('checkout-button-sku_FyWk7SsceCRUid');
          checkoutButton.addEventListener('click', function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            stripe.redirectToCheckout({
              items: [{sku: 'sku_FyWk7SsceCRUid', quantity: 1}],

              // Do not rely on the redirect to the successUrl for fulfilling
              // purchases, customers may not always reach the success_url after
              // a successful payment.
              // Instead use one of the strategies described in
              // https://stripe.com/docs/payments/checkout/fulfillment
              successUrl: 'https://fastaiapp-85ff8.firebaseio.com',
              cancelUrl: 'https://fastaiapp-85ff8.firebaseio.com',
            })
            .then(function (result) {
              if (result.error) {
                // If `redirectToCheckout` fails due to a browser or network
                // error, display the localized error message to your customer.
                var displayError = document.getElementById('error-message');
                displayError.textContent = result.error.message;
              }
            });
          });

      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    });
  
  });