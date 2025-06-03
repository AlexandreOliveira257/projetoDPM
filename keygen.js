document.addEventListener('DOMContentLoaded', function() {
    // Sample games data - you can expand this or load from external source
    const games = [
        {
            title: "Cyberpunk 2077",
            platform: "PC - Steam",
            price: "€59.99",
            image: "imgs/games/cyberpunk2077.jpg"
        },
    ];

    // Generate random game key
    function generateGameKey() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let key = '';
        
        for (let i = 0; i < 4; i++) {
            let segment = '';
            for (let j = 0; j < 4; j++) {
                segment += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            key += segment;
            if (i < 3) key += '-';
        }
        
        return key;
    }

    // Generate random order ID
    function generateOrderId() {
        const randomNum = Math.floor(Math.random() * 999999) + 100000;
        return `#SG-${randomNum}`;
    }

    // Get current date formatted
    function getCurrentDate() {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date().toLocaleDateString('en-US', options);
    }

    // Select random game
    function getRandomGame() {
        return games[Math.floor(Math.random() * games.length)];
    }

    // Get payment method from localStorage or default
    function getPaymentMethod() {
        // In a real application, you'd get this from the checkout process
        const methods = {
            'credit-card': 'Credit Card',
            'paypal': 'PayPal',
            'mbway': 'MB WAY',
            'bank-transfer': 'Bank Transfer'
        };
        
        const savedMethod = localStorage.getItem('paymentMethod');
        return methods[savedMethod] || 'Credit Card';
    }

    // Show success state after loading
    function showSuccessState() {
        const loadingState = document.getElementById('loading-state');
        const successState = document.getElementById('success-state');
        
        // Generate random data
        const gameKey = generateGameKey();
        const orderId = generateOrderId();
        const currentDate = getCurrentDate();
        const randomGame = getRandomGame();
        const paymentMethod = getPaymentMethod();
        
        // Update game information
        document.getElementById('game-title').textContent = randomGame.title;
        document.getElementById('game-platform').textContent = randomGame.platform;
        document.getElementById('game-price').textContent = randomGame.price;
        document.getElementById('game-cover').src = randomGame.image;
        document.getElementById('game-cover').alt = randomGame.title;
        
        // Update order details
        document.getElementById('game-key').textContent = gameKey;
        document.getElementById('order-id').textContent = orderId;
        document.getElementById('purchase-date').textContent = currentDate;
        document.getElementById('payment-method').textContent = paymentMethod;
        
        // Hide loading and show success
        loadingState.style.display = 'none';
        successState.style.display = 'block';
        successState.style.opacity = '0';
        
        // Fade in effect
        setTimeout(() => {
            successState.style.transition = 'opacity 0.5s ease-in-out';
            successState.style.opacity = '1';
        }, 100);
    }

    // Copy key to clipboard functionality
    const copyButton = document.getElementById('copy-key');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const gameKey = document.getElementById('game-key').textContent;
            
            // Use the modern clipboard API if available
            if (navigator.clipboard) {
                navigator.clipboard.writeText(gameKey).then(() => {
                    showCopyFeedback();
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    fallbackCopyText(gameKey);
                });
            } else {
                fallbackCopyText(gameKey);
            }
        });
    }

    // Fallback copy method for older browsers
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback();
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy key. Please select and copy manually.');
        }
        
        document.body.removeChild(textArea);
    }

    // Show copy feedback
    function showCopyFeedback() {
        const copyButton = document.getElementById('copy-key');
        const originalText = copyButton.innerHTML;
        
        copyButton.innerHTML = '✅';
        copyButton.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyButton.innerHTML = originalText;
            copyButton.style.backgroundColor = '#ff6b00';
        }, 2000);
    }

    // Handle image loading errors
    const gameImage = document.getElementById('game-cover');
    if (gameImage) {
        gameImage.addEventListener('error', function() {
            // Fallback to a placeholder image if the game image fails to load
            this.src = 'imgs/games/placeholder.jpg';
            this.alt = 'Game Cover';
        });
    }

    // Clear any stored payment method after use
    setTimeout(() => {
        localStorage.removeItem('paymentMethod');
    }, 5000);

    // Start the loading process
    // Show success state after 3 seconds (simulating key generation)
    setTimeout(showSuccessState, 3000);
});