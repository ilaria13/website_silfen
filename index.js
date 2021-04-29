function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
// function searchFunction(){
//     document.querySelector(.searchpage).classList.remove(.hidden);
// }

// function searchFunction() {
//   // var element = document.getElementById("searchpage");
//   // element.classList.remove("hidden");
//   document.querySelector(".searchpage").classList.remove("hidden");
// }

window.addEventListener("load", addHidden);

function addHidden() {
  console.log("addHidden()");
  document.querySelector("#searchpage").classList.add("hidden");
  document.querySelector("#searchicon").addEventListener("click", removeHidden);
}

function removeHidden() {
  console.log("removeHidden()");
  this.removeEventListener("click", removeHidden);
  document.querySelector("#searchpage").classList.remove("hidden");
  document.querySelector("#searchicon").addEventListener("click", addHidden);
}
