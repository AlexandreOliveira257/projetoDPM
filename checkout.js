document.addEventListener('DOMContentLoaded', function() {
    // Payment method handling
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('card-details');
    const cardInputs = cardDetails.querySelectorAll('input');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                cardDetails.style.display = 'block';
                // Make card fields required when credit card is selected
                cardInputs.forEach(input => {
                    input.setAttribute('required', 'required');
                });
            } else {
                cardDetails.style.display = 'none';
                // Remove required attribute when other payment methods are selected
                cardInputs.forEach(input => {
                    input.removeAttribute('required');
                    input.value = ''; // Clear the values
                });
            }
        });
    });
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            this.value = formattedValue;
        });
    }
    
    // Expiry date formatting (MM/YY)
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }
    
    // CVV input - numbers only
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Form validation
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if payment method is selected
        const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!selectedPayment) {
            alert('Please select a payment method.');
            return;
        }
        
        // If credit card is selected, validate card details
        if (selectedPayment.value === 'credit-card') {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const cardName = document.getElementById('cardName').value;
            
            if (!cardNumber || cardNumber.length < 13) {
                alert('Please enter a valid card number.');
                return;
            }
            
            if (!expiryDate || !expiryDate.match(/^\d{2}\/\d{2}$/)) {
                alert('Please enter a valid expiry date (MM/YY).');
                return;
            }
            
            if (!cvv || cvv.length < 3) {
                alert('Please enter a valid CVV.');
                return;
            }
            
            if (!cardName.trim()) {
                alert('Please enter the name on the card.');
                return;
            }
        }
        
        // If all validations pass, redirect to confirmation page
        // You can change this URL to your actual confirmation page
        window.location.href='keygen.html';
    });
});