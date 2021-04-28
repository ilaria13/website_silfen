/* key are in urls right now - set as x-apikey in header */
/* https://s2021-8556.restdb.io/rest/testing?apikey=6034ed655ad3610fb5bb655d&q={}&filter= */

const form = document.querySelector("form");

console.log(form.elements);
document.querySelector("button").addEventListener("click", submit);

function submit(e) {
  e.preventDefault();
  //alert(form.elements.query.value);
  const q = form.elements.query.value;
  const url =
    'https://silfen-9520.restdb.io/rest/products?apikey=608278cf28bf9b609975a5b3&q={"$or": [{"name": {"$regex" : "' +
    q +
    '"}}, {"collection": {"$regex" : "' +
    q +
    '"}}]}';

  console.log(url);

  fetch(url, {
    method: "GET",
    headers: {
      "x-apikey": "608278cf28bf9b609975a5b3",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      show(response, q);
    })
    .catch((err) => {
      console.error(err);
    });
}

function show(matches, q) {
  matches.forEach((match) => {
    console.log(match);
    const template = document.querySelector(".searchresults").content;
    const copy = template.cloneNode(true);

    const h2Content = match.name;
    /*match.username.replaceAll(
      q,
      '<span class="red">' + q + "</span>"
    );*/
    console.log(h2Content);
    copy.querySelector("h2").innerHTML = h2Content;

    copy.querySelector("h3").innerHTML = match.collection.replaceAll(
      q,
      '<span class="red">' + q + "</span>"
    );
    /*  createAndFilter(copy, match, "h3", "email", q); */
    document.querySelector("section").appendChild(copy);
  });

  /*  function createAndFilter(copy, match, element, key, q) {
    copy.querySelector(element).innerHTML = match.key.replaceAll(
      q,
      '<span class="red">' + q + "</span>"
    );
  }*/
}
