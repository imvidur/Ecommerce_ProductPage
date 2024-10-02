const minus = document.querySelector(".minus");
const itemCountEl = document.querySelector(".count");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartContainer = document.querySelector(".cart-container");
const addToCart = document.querySelector(".add-to-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");

let count = 0;
let totalCartQty = 0;

// Function to reset the count
const resetCount = () => {
    count = 0;
    updateItemCount();
  }; 

// Update item count in the DOM
const updateItemCount = () => {
  itemCountEl.textContent = count;
};

// Handle minus button click
const decrementCount = () => {
  count = Math.max(0, count - 1); // Ensures count doesn't go below 0
  updateItemCount();
};

// Handle plus button click
const incrementCount = () => {
  count += 1;
  updateItemCount();
};

// Event listeners for buttons
minus.addEventListener("click", decrementCount);
plus.addEventListener("click", incrementCount);


//action to perform when either icon or count is clicked
cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("active");
  });
  
cartCount.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});


//For the count to show above the cart logo when add to cart is done
const updateTotalCartQty = () => {
  const cartItemsContainerList = document.querySelectorAll(".cart-item");
  totalCartQty = 0;
  cartItemsContainerList.forEach((item) => {
    totalCartQty += parseInt(item.dataset.quantity);
  });
  cartCount.innerHTML = `<span class="totalqty">${totalCartQty}</span>`;
};

// add item to cart function
const addItemToCart = (name, price, imageSrc) => {
const totalPrice = count * price;

  //cart-item class is added dynamically using JS when an item is added to the cart
  const cartItem = document.createElement("div");

  //adding the "cart-item" class to the cartItem element.
  cartItem.classList.add("cart-item");

  //custom attribute-dataset.quantity
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `
      <img src="${imageSrc}" alt="${name}" />
      <div class="item-details">
        <div>${name}</div>
        <div>
            <p>
                $${price.toFixed(2)} x ${count} 
                <span class='total-price'>$${totalPrice.toFixed(2)}</span>
            </p>
        </div>
        </div>
        <button class="delete-item"> 
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
        </button>
    `;
    //after creating cart-item dynamically in JS, you append it to the cartItemsContainer
  cartItemsContainer.appendChild(cartItem);
  updateTotalCartQty();
  if (cartItemsContainer.classList.contains("empty")) {
    cartItemsContainer.classList.remove("empty");
    checkout.classList.remove("empty");
  }

  // attach an event listener for the delete button to remove item for cart
  const deleteButton = cartItem.querySelector(".delete-item");   // this .delete-item is a class for delete button
  deleteButton.addEventListener("click", (event) => {

    //to ensure u are targeting correct item to delete
    const cartItem = event.target.closest(".cart-item");
    removeItemFromCart(cartItem);
  });
};

addToCart.addEventListener("click", () => {
  if (count === 0) 
    return;
    //To extract product details
  const productName = document.querySelector(".main .product-name").textContent;
  const productPriceEl = document.querySelector(".main .curr-price");
  //now to extract the productprice by removing the dollar sign and converting it to number
  const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
  const productImg = document
    .querySelector(".default.gallery .central-img img")
    .getAttribute("src");

    //calling addItemToCart function
  addItemToCart(productName, productPrice, productImg);

  //for cart to show now, we add active class to cartContainer
  cartContainer.classList.add("active");

  //after item has been added to the cart, we reset the count back to 0.
  resetCount();
});


// remove item from cart
const removeItemFromCart = (cartItem) => {
    cartItem.remove(); 
    updateTotalCartQty();   
    // Check if the cart is empty and update accordingly
    if (cartItemsContainer.childElementCount === 1) {
      cartItemsContainer.classList.add("empty");
      checkout.classList.add("empty");
    }
  };
  