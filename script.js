function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done");
    }, ms)
  })
}

// Level 3
async function getProducts() {
  console.log("Loading products...");
  
  try {
    await delay(1000);

    const res = await fetch("https://dummyjson.com/products");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    for (let i = 0; i < 5; i++) {
      console.log(`${data.products[i].id}. ${data.products[i].title}`);
    }
  } catch (err) {
    console.log(err);
  }
}

// Level 4
async function searchProducts(searchTerm) {
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
    if (data.total === 0) {
      console.log("No products found.");
    } else {
      console.log(`Searching for: ${searchTerm}\n`);

      data.products.forEach((product, count) => {
        console.log(`${count + 1}. ${product.title} - $${product.price}`);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

getProducts();

// searchProducts("phone");





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
