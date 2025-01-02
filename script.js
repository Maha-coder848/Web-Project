function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation checks
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('All fields are required!');
            return false;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        // If everything is fine, allow the form to submit
        alert('Form submitted successfully!');
        return true; // Change this to `true` if you want to allow form submission
    }




     // Function to change the main product image and highlight the selected thumbnail
     function changeImage(thumbnail) {
        const mainImage = document.getElementById('main-img');
        const smallImages = document.querySelectorAll('.small-img');

        // Update main image source to thumbnail source
        mainImage.src = thumbnail.src;

        // Remove active class from all thumbnails
        smallImages.forEach(img => img.classList.remove('active'));

        // Add active class to the clicked thumbnail
        thumbnail.classList.add('active');
    }

    // Function to add the selected product to the cart
    function addToCart() {
        const productName = document.getElementById('product-name').textContent;
        const productPrice = document.getElementById('product-price').textContent.replace('Rs ', '');
        const productSize = document.getElementById('size').value;
        const productQuantity = parseInt(document.getElementById('quantity').value, 10);
        const cartMessage = document.getElementById('cart-message');

        // Validate the selected size
        if (productSize === "Select size") {
            cartMessage.textContent = "Please select a size.";
            cartMessage.style.color = "red";
            return;
        }

        // Create a product object
        const product = {
            name: productName,
            price: parseFloat(productPrice),
            size: productSize,
            quantity: productQuantity,
            image: document.getElementById('main-img').src
        };

        // Retrieve existing cart from local storage or initialize an empty array
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        existingCart.push(product); // Add the new product to the cart
        localStorage.setItem('cart', JSON.stringify(existingCart)); // Save updated cart

        cartMessage.textContent = "Product added to cart!";
        cartMessage.style.color = "green";
    }





            // Function to display cart contents
            function displayCart() {
                const cartItemsDiv = document.getElementById('cart-items');
                cartItemsDiv.innerHTML = ''; // Clear previous items
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
                if (cart.length === 0) {
                    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
                    return;
                }
    
                // Display each product in the cart
                cart.forEach((item, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('cart-item');
                    itemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <strong>${item.name}</strong> (Size: ${item.size})<br>
                            Quantity: ${item.quantity}<br>
                            Price: Rs ${item.price * item.quantity}
                        </div>
                        <span class="remove-item" onclick="removeFromCart(${index})">&times; Remove</span>
                    `;
                    cartItemsDiv.appendChild(itemDiv);
                });
            }
    
            // Function to remove an item from the cart
            function removeFromCart(index) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1); // Remove the item at the specified index
                localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
                displayCart(); // Refresh the cart display
            }
    
            // Function to clear the entire cart
            function clearCart() {
                localStorage.removeItem('cart'); // Remove cart from local storage
                displayCart(); // Refresh the cart display
            }
    
            // Display the cart when the page loads
            window.onload = displayCart;



