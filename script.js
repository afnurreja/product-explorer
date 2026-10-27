// Level 3
async function getProducts() {
  try {
    const res = await fetch(
      "https://dummyjson.com/products?utm_source=chatgpt.com",
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    
    for(let i = 0; i < 5; i++) {
        console.log(`${data.products[i].id}. ${data.products[i].title}`);
    }
  } 
  catch (err) {
    console.log(err);
  }
}

console.log("Loading products...");
getProducts();

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
