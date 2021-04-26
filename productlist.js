function getData() {
  fetch("https://silfen-9520.restdb.io/rest/products", {
    method: "GET",
    headers: {
      "x-apikey": "608278cf28bf9b609975a5b3",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showProducts(response);
      //   console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
}

getData();

function showProducts(products) {
  products.forEach((product) => {
    const template = document.querySelector(".product").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = product.name;
    copy.querySelector(".collection").textContent = product.collection;
    copy.querySelector(".colours").textContent = product.color;
    copy.querySelector(".OPrice span").textContent = product.price;
    copy.querySelector(".NewPrice span").textContent = product.newprice;
    copy.querySelector("button").dataset.id += product._id;

    document.querySelector(".productList").appendChild(copy);
  });

  const contents = [
    {
      _id: "6081530d9df28c5100011954",
      img: "nonoe",
      qty: "3",
      name: "this is the name",
      price: "320",
    },
    {
      _id: "3",
      img: "imbala",
      qty: "4",
      name: "this is the name2",
      price: "620",
    },
    {
      _id: "4",
      img: "gulo",
      qty: "5",
      name: "this is the name3",
      price: "810",
    },
  ];

  contents.forEach((purchase) => {
    console.log(purchase);

    const tempItem = document.querySelector("#cart-item-template").content;
    const itemCopy = tempItem.cloneNode(true);
    document.querySelector(".cart-content").appendChild(itemCopy);
  });
}

/*

const contents = [
    {
    _id="2",
    img="nonoe",
    qty="3",
    name="this is the name",
    price="320",
    },
    {
    _id="3",
    img="imbala",
    qty="4",
    name="this is the name2",
    price="620",
    },
    {
    _id="3",
    img="gulo",
    qty="5",
    name="this is the name3",
    price="810",
    },
];

contents.forEach((purchase)=>{
    console.log(purchase);

    const tempItem = document.querySelector("#cart-item-template").content;
    const itemCopy = tempItem.cloneNode(true);
    document.querySelector(".cart-content").appendChild(itemCopy);
});

*/
