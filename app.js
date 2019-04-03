

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(xhttp.responseText);
    let items = response.items;

    let output = "";

    for (let i = 0; i < items.length; i++) {
      output +=
       ` <div class='col-md-4'  >
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

    document.getElementById("list").innerHTML = output;
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
$(document).ready(function(){

  
    
    $("button").on("click",  function() {
      let $name = $(this).find(name);
      console.log($name);
        
    });

   
    
    




});//Ready


