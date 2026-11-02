const header2Input = document.querySelector(".header-2-input");
const productContainer = document.querySelector(".products-container");
const search = document.querySelector(".input");

search.addEventListener("change", (e) => {
  if ((e.target.value).trim()) {
    productContainer.innerHTML = "";
    renderData(searchProducts(e.target.value));
  } 
});

function getCard(img, title, price, rating) {
  const card = document.createElement("div");
  card.className = "product-card";
  const cardContent = `
          <div class="product-image">
            <img src="${img}" alt="" />
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
              <div class="instock-div">
                <i class="ri-checkbox-blank-circle-fill circle"></i>
                <p class="in-stock">In Stock</p>
              </div>
            </div>
          </div>
    `;
  card.innerHTML = cardContent;

  return card;
}

async function renderData(data) {
  const allProducts = await data;
  console.log(allProducts);
  
  if (allProducts.total === 0) {
    productContainer.style.textAlign = "center";
    productContainer.innerHTML = "<h3>No products found.</h3>";
    return;
  }

  allProducts.products.forEach((product, count) => {
    const img = product.thumbnail;
    const title = product.title;
    const price = product.price;
    const rating = product.rating;

    const card = getCard(img, title, price, rating);
    productContainer.appendChild(card);
  });
}

async function getProducts() {
  console.log("Loading products...");

  try {
    // await delay(1000);

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
// searchProducts("phone");

// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Done");
//     }, ms)
//   })
// }

// Level 1
// function getUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve({
//         id: 1,
//         name: "Alex",
//         course: "JavaScript",
//       });
//     }, 2000);
//   });
// }

// console.log("Loading user data...");
// getUserData()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Level 2
// async function loadUser() {
//   try {
//     const userData = await getUserData();
//     console.log(`Name: ${userData.name}`);
//     console.log(`Course: ${userData.course}`);
//   } catch (err) {
//     console.log(err);
//   }
// }

// loadUser();

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
