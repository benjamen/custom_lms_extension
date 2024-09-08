frappe.ready(function () {
    // Function to handle the dynamic payment process
    function initiatePayment(amount, user_name, user_email, user_phone) {
        // Call the backend to get the preferred payment gateway
        frappe.call({
            method: "custom_lms_extension.custom_methods.get_payment_gateway",
            callback: function (response) {
                var gateway = response.message.gateway;

                if (gateway === "razorpay") {
                    initiateRazorpayPayment(amount, user_name, user_email, user_phone);
                } else if (gateway === "stripe") {
                    initiateStripePayment(amount, user_name, user_email);
                }
                // Add more payment gateways as needed
            }
        });
    }

    // Example Razorpay payment function (replace with actual logic)
    function initiateRazorpayPayment(amount, name, email, phone) {
        console.log("Razorpay payment initiated with amount:", amount);
        // Razorpay integration logic here
    }

    // Example Stripe payment function (replace with actual logic)
    function initiateStripePayment(amount, name, email) {
        console.log("Stripe payment initiated with amount:", amount);
        // Stripe integration logic here
    }
});
