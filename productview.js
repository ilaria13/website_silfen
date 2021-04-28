/* const searchParams = new URLSearchParams(window.location.search);  */
/* const productId = searchParams.get("products"); */
fetch("https://silfen-9520.restdb.io/rest/products/608152979df28c5100011952", {
        "method": "GET",
        "headers": {
          "x-apikey": "608278cf28bf9b609975a5b3"
        }
      })
    .then((res) => res.json())
    .then((response) => {
      showProducts(response);
    })
    .catch((err) => {
      console.error(err);
    });
    
/* getData(); */

function showProducts(product) {
    console.log("hello");
  document.querySelector(".name").textContent = product.name;
  document.querySelector(".collection").textContent = product.collection;
  /* document.querySelector(".colours").textContent = product.color; */
  document.querySelector(".OPrice span").textContent = product.price;
  document.querySelector(".NewPrice span").textContent = product.newprice;
/*   document.querySelector("button").dataset.id += product._id; */
/*   document.querySelector(".productList").appendChild(copy); */


/* IMG-URL EXAMPLE: https://annadalsgaard.dk/img/aquamarine_IDA_FRONT.jpg */

document.querySelector(".productImage").src =
  "https://annadalsgaard.dk/img/" +
  product.color[0] +
  product.basename;
product.color.forEach((color) => {
  console.log(color);
  const div = document.createElement("div");
  div.style.background = color;
  div.addEventListener("click", () => {
    console.log(color);
    document.querySelector(".productImage").src ="https://annadalsgaard.dk/img/" +
    color +
    product.basename;
  });
  document.querySelector(".colorpicker").appendChild(div);
});
}
/*  
 const searchParams = new URLSearchParams(window.location.search);
 const articleId = searchParams.get("article") 
  fetch("https://datawp-89e7.restdb.io/rest/posts/"+articleId, {
    "method": "GET",
    "headers": {
      "x-apikey": "606eda48f592f7113340ed65"
    }
  })
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
    console.log(data);
    document.querySelector("h2").textContent = data.title;
    document.querySelector("h3 span").textContent = data.author;
    document.querySelector("h4").textContent = data.date;
    document.querySelector("p").textContent = data.content;
} */
