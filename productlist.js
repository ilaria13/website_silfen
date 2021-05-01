const urlParams = new URLSearchParams(window.location.search);
const collectionFromUrl = urlParams.get("collection");
const categoryFromUrl = urlParams.get("category");
const bestsellerFromUrl = urlParams.get("bestseller");

let url = "https://silfen-9520.restdb.io/rest/products";

if (categoryFromUrl) {
  url =
    "https://silfen-9520.restdb.io/rest/products" +
    '?q={"category":"' +
    categoryFromUrl +
    '"}';
  console.log(url);
}
if (collectionFromUrl) {
  url =
    'https://silfen-9520.restdb.io/rest/products?q={"collection":"' +
    collectionFromUrl +
    '"}';
  console.log(url);
}
if (bestsellerFromUrl) {
  url = 'https://silfen-9520.restdb.io/rest/products?q={"bestseller":"YES"}';
  console.log(url);
}

function getData() {
  fetch(url, {
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
    copy.querySelector(".productImage").src = product.imgurl1;
    copy.querySelector(".collection").textContent = product.collection;
    copy.querySelector(".colours").textContent = product.color;
    copy.querySelector(".OPrice span").textContent = product.price;
    copy.querySelector(".NewPrice span").textContent = product.newprice;
    copy.querySelector("button").dataset.id += product._id;
    copy.querySelector(
      ".viewProduct"
    ).href = `productview.html?products=${product._id}`;
    document.querySelector(".productList").appendChild(copy);
  });

  /*
  const CART = {
    contents: [],
    init() {
      CART.contents = [
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
      this.updateDOM();
    },

    updateDOM() {
      CART.contents.forEach((element) => {
        console.log(element);

        const tempItem = document.querySelector("#cart-item-template").content;
        const itemCopy = tempItem.cloneNode(true);

        const labelEL = itemCopy.querySelector("label");
        labelEL.textContent = element.name;
        labelEL.setAttribute("for", element.name);

        const inputEL = itemCopy.querySelector("input");
        inputEL.id += element.id;
        inputEL.name = element.name;

        inputEL.value = element.qty;

        const priceEl = itemCopy.querySelector(".price-each span");
        priceEl.textContent = element.price;

        document.querySelector(".cart-content").appendChild(itemCopy);
      });
    },
  };
}

CART.init();
*/

  const CART = {
    KEY: "basket",
    contents: [],
    init() {
      //_contents is a temporary string
      let _contents = localStorage.getItem(CART.KEY);

      if (_contents) {
        //if there's anything there, turn it into JS objects, that we can access with the dot . notation
        CART.contents = JSON.parse(_contents);
      } else {
        CART.contents = [
          {
            _id: "607f216322a6f434000e601e",
            img: "http://Kari.ca/",
            qty: 5,
            name: "Ut dolores",
            price: 730,
          },
          {
            _id: "2",
            img: "nonoe",
            qty: 2,
            name: "Hej there",
            price: 500,
          },
          {
            _id: "3",
            img: "nonoe",
            qty: 3,
            name: "Hej there",
            price: 500,
          },
        ];
      }
      //I want to update the
      //this.updateDOM(); //lacj!!! use this when we're not hardcoding the contents, and the content is read from localStorage
      CART.sync();
    },
    sync() {
      //turn CART contents array of objects into a string that we can write in localStorage
      let _cart = JSON.stringify(CART.contents);
      localStorage.setItem(CART.KEY, _cart);
      CART.updateDOM();
    },
    updateDOM() {
      const cartcontentEl = document.querySelector(".cart-content");
      cartcontentEl.innerHTML = "";

      //If we have an empty array / an array with the length of 0
      if (CART.contents.length === 0) {
        cartcontentEl.innerHTML = "<h4>The cart is empty</h4>";
      } else {
        CART.contents.forEach((element) => {
          // console.log(element);

          const tempItem = document.querySelector("#cart-item-template")
            .content;
          const itemcopy = tempItem.cloneNode(true);

          const id = element._id;
          const labelEl = itemcopy.querySelector("label");
          labelEl.textContent = element.name;
          labelEl.setAttribute("for", "fid-" + id);

          const minusBtn = itemcopy.querySelector(".minus");
          minusBtn.addEventListener("click", () => {
            CART.minusOne(id);
          });

          const inputEl = itemcopy.querySelector("input");
          inputEl.id += id;
          inputEl.name += id;
          inputEl.value = element.qty;

          inputEl.addEventListener("input", () => {
            const itemQty = inputEl.valueAsNumber;
            element.qty = itemQty;
            /*  console.log("element");
          console.log(element); */
            CART.update(element);
          });

          inputEl.addEventListener("focus", (e) => {
            e.target.select();
          });

          const plusBtn = itemcopy.querySelector(".plus");
          plusBtn.addEventListener("click", () => {
            CART.plusOne(id);
          });

          const priceEl = itemcopy.querySelector(".price-each span");
          priceEl.textContent = element.price;

          cartcontentEl.appendChild(itemcopy);
        });
      }
    },
    add(obj) {
      const index = CART.contents.findIndex(
        (element) => element._id == obj._id
      );
      if (index == -1) {
        console.log(obj);
        obj.qty = 1;
        console.log(CART.contents);
        CART.contents.push(obj);
      } else {
        CART.contents[index].qty += 1;
      }
      console.log(CART.contents);
      this.sync();
    },
    update(obj) {
      //find the index of the object
      const index = CART.contents.findIndex(
        (element) => element._id == obj._id
      );

      //If the qty is 0 we'll remove from the CART.contens array of objects, so that it's nol onger show in the cart
      if (obj.qty === 0) {
        //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        //1. parameter start (index in the array), 2. paramter: how many? - here 1
        CART.contents.splice(index, 1);
      } else {
        //we'll have to read the data from the input field
        /* const inputEl = document.querySelector("#fid-" + obj._id);
    CART.contents[index].qty = inputEl.valueAsNumber; */
        CART.contents[index].qty = obj.qty;
      }

      CART.sync();
    },
    minusOne(id) {
      const indexObj = CART.contents.find((element) => element._id == id);
      indexObj.qty--;
      console.log(indexObj);
      CART.update(indexObj);
    },
    plusOne(id) {
      const indexObj = CART.contents.find((element) => element._id == id);
      indexObj.qty++;
      console.log(indexObj);
      CART.update(indexObj);
    },
  };

  CART.init();
}
