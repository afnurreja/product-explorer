const productContainer = document.querySelector(".products-container");
const search = document.querySelector(".input");
const header2Input = document.querySelector(".header-2-input");
const searchIcon = document.querySelector(".search-icon-2");
const search2 = document.querySelector(".input-2");


const reload = (e) => {
  if (e.target.value === "") {
    productContainer.innerHTML = "";
    renderData(getProducts());
    e.target === search ? (search2.value = "") : (search.value = "");
  }
};

const searchRender = (e, trgt) => {
  if (e.target.value.trim()) {
    productContainer.innerHTML = "";
    renderData(searchProducts(e.target.value));
    trgt.value = e.target.value;
  }
};

search.addEventListener("input", reload);
search2.addEventListener("input", reload);

searchIcon.addEventListener("click", () => {
  header2Input.classList.toggle("none");
});

search.addEventListener("change", (e) => {
  searchRender(e, search2);
});

search2.addEventListener("change", (e) => {
  searchRender(e, search);
});

function getCard(img, title, price, rating, availability) {
  let inStockColor = "#15945b";
  const card = document.createElement("div");
  card.className = "product-card";

  if(availability === "Out of Stock") {
      inStockColor = "#7c7d7dd7";
  }

  const cardContent = `
          <div class="product-image">
            <img src="${img}" alt="${title}" />
          </div>
          <div class="product-info">
            <h2 class="title">${title}</h2>
            <p class="price">$${price}</p>
            <div class="bottom"> 
              <div class="rating-div">
                <i class="ri-star-fill star-icon"></i>
                <p class="rating">${rating}</p>
              </div>
              <div class="line"></div>
              <div style="color: ${inStockColor}" class="instock-div">
                <i class="ri-checkbox-blank-circle-fill circle"></i>
                <p class="in-stock">${availability}</p>
              </div>
            </div>
          </div>
    `;
  card.innerHTML = cardContent;

  return card;
}

async function renderData(data) {
  try {
    const allProducts = await data;

    if (allProducts.total === 0) {
      productContainer.style.textAlign = "center";
      productContainer.innerHTML = "<h3>No products found.</h3>";
      return;
    }

    productContainer.style.textAlign = "";
    allProducts.products.forEach((product) => {
      const img = product.thumbnail;
      const title = product.title;
      const price = product.price;
      const rating = product.rating;
      const availability = product.availabilityStatus;

      const card = getCard(img, title, price, rating, availability);
      productContainer.appendChild(card);
    });
  } catch (error) {
    console.log("Error while rendering data", error);
  }
}

async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function searchProducts(searchTerm) {
  console.log(searchTerm);
  if (!searchTerm.trim()) {
    console.log("Please enter a product name.");
    return;
  }

  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

const promiseData = getProducts();
renderData(promiseData);

// catogary list
// [
// "beauty",
// "fragrances",
// "furniture",
// "groceries",
// "home-decoration",
// "kitchen-accessories",
// "laptops",
// "mens-shirts",
// "mens-shoes",
// "mens-watches",
// "mobile-accessories",
// "motorcycle",
// "skin-care",
// "smartphones",
// "sports-accessories",
// "sunglasses",
// "tablets",
// "tops",
// "vehicle",
// "womens-bags",
// "womens-dresses",
// "womens-jewellery",
// "womens-shoes",
// "womens-watches"
// ]

// search using catogary
// https://dummyjson.com/products/category/smartphones



// Search Optimization (Learned, not implemented)

// 1. Debouncing
// - Prevents unnecessary repeated API requests while the user is typing.
// - Waits for a specified time after the last keystroke before making a request.
// - Uses `setTimeout()` and `clearTimeout()`.

// 2. Race Condition
// - Occurs when multiple asynchronous requests finish in a different order than they were started.
// - An older request may overwrite the results of a newer request.
// - Use a request ID to ensure only the latest request's results are displayed.

// **Remember:**
// - Debouncing controls how frequently requests start.
// - Race condition handling prevents outdated results from being displayed.