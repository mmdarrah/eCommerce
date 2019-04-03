var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(xhttp.responseText);
    let items = response.items;

    let output = "";

    for (let i = 0; i < items.length; i++) {
      output += ` <div class='col-md-4'  >
        <IMG src= 
        ${items[i].image} class="card-img-top" 
        > 
        <div class="card-body"  >
        <h5 class="card-title" >${items[i].name}</h5>
        <p class="card-text">Diameter: ${items[i].height}</p>
        <p class="card-text">Ursprung: ${items[i].origin}</p>
        <p class="card-text"><h5>${items[i].price}:-</h5></p>
        <button type="button" class="btn btn-success btn-lg btn-block btn-sm">Köpa</button>
        </div>
        </div>`;
    }

    let list = document.getElementById("list");
    if (list != null) {
      list.innerHTML = output;
    }

    let cart = localStorage.getItem("basket");
    if (cart != null) {
      cart = JSON.parse(cart);
      let basketOutput = "";
      for (let i = 0; i < cart.length; i++) {
        basketOutput += ` <div class='col-md-4'  >
>
        <h5 class="card-title" >${cart[i].name}</h5>
        
        <p class="card-text"><h5>${cart[i].price}</h5></p>
        </div>
        </div>`;
      }
      let basketList = document.getElementById("basket");
      if (basketList != null) {
        basketList.innerHTML = basketOutput;
      }
    }
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();

/* (function(){
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function(){
    cart.classList.toggle('show-cart');
  });
})();
 */

/* jQuery start here */
$(document).ready(function() {
  $("button").on("click", function() {
    let parent = $(this).siblings("h5");
    console.log("Selected Product");
    console.log(parent[0].innerText);
    console.log(parent[1].innerText);
    let temp = localStorage.getItem("basket");
    if (temp != null) {
      let cart = JSON.parse(temp);

      cart.push({ name: parent[0].innerText, price: parent[1].innerText });
      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
    } else {
      let buyBasket = [];
      buyBasket.push({
        name: parent[0].innerText,
        price: parent[1].innerText
      });
      let cart = JSON.stringify(buyBasket);
      localStorage.setItem("basket", cart);
    }
    console.log(buyBasket);
  });
}); //Ready
