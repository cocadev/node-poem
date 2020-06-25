// add scripts

$(document).on('ready', function() {
   
//   var checkoutHandler = StripeCheckout.configure({
//     key: "sk_test_YhDlloBiKqj08XVDnr7H0hXK00v37XYsXn"
//   });

//   var button = document.getElementById("buttonCheckout");
// button.addEventListener("click", function(ev) {
//   checkoutHandler.open({
//     name: "Sample Store",
//     description: "Example Purchase",
//     token: handleToken
//   });
// });

// function handleToken(token) {
//   console.log(token)
//   // fetch("/charge", {
//   //   method: "POST",
//   //   headers: {"Content-Type": "application/json"},
//   //   body: JSON.stringify(token)
//   // })
//   // .then(output => {
//   //   if (output.status === "succeeded")
//   //     document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
//   // })
// }
  
//   console.log('sanity check!');

var stripe = Stripe('pk_test_jUTRLQCyn30vSFveHCsvXv9Q00NqUymk5D');
stripe.redirectToCheckout({
  
  sessionId: 'cs_test_Nt33MFKisrYherjHVTvU9QIfuhT4gym34ZSkaH7R9YOXZ9bUHenSVCAV'
}).then(function (result) {
  console.log(result);
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `result.error.message`.
});
});
