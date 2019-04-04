




let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(xhttp.responseText);
    let items = response.items;

    let output = "";
    
    
    
    for (let i = 0; i < items.length; i++) {
      output += ` <div id="img" class='col-md-4'  >
        <IMG src= 
        ${items[i].image} class="card-img-top">
        <div class="card-body"  >
        <h5 class="card-title" >${items[i].name}</h5>
        <p class="card-text">Diameter: ${items[i].height}</p>
        <p class="card-text">Ursprung: ${items[i].origin}</p>
        <h5 style="display: none;">${
        items[i].id}</h5><input  id="num" type="number" name="quantity" min="1" max="10">
        <p class="card-text"><h5>${items[i].price}</h5></p>
        <button type="button" id="add" class="btn btn-success btn-lg btn-block btn-sm">Köpa</button>
        </div>
        </div>`;


    }
    
      function loadItems() {
        let allItems = [];
        for (let i = 0; i < items.length; i++) {
          allItems.push({
            id: items[i].id,
            name: items[i].name,
            image: items[i].image,
            price: items[i].price,
            
          })
          
        }
        
        return allItems


      }
    /* console.log(loadItems()); */
    

    let list = document.getElementById("list");
    if (list != null) {
      list.innerHTML = output;
    }

    let cart = localStorage.getItem("basket");
    if (cart != null) {
      cart = JSON.parse(cart);
      let basketOutput = "";
      for (let i = 0; i < cart.length; i++) {
        basketOutput += ` 
                    
              <tr>
                <td>${cart[i].name}</td>
                <td>${cart[i].price}</td> 
                <td><input  id="num" type="number" name="quantity" min="1" max="10"></td>
                <td><span><i class="fas fa-trash-alt"></i></span></td>
              </tr>
       
        
        `;
      }
      let delBtn = document.getElementById("delBtn");
      let basketList = document.getElementById("basket");
      if (basketList != null) {
        basketList.innerHTML = basketOutput;
        delBtn.removeAttribute("style")
      }
    }
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();


/* let quantity = $("input").val()
    console.log(quantity); */

/* jQuery start here */
/* $(document.body).on('click', '.add', function () {
        const cardElem = $(this).closest('.card'),
            id = parseInt(cardElem.data('id')),
            quantity = parseInt(cardElem.find('.quantity').val());

        addToCart(id, quantity);
        fillCart();
    }); */
$(document).ready(function() {

  /* $("button").on('click', '.num', function () {
    let cardElem = $(this).closest('input')
    
      quantity = parseInt(cardElem.find('.quantity').val());
    console.log(quantity);

  }) */


  
   /* $("button").on('click', function () {
     let quantity = $(".add").val()
    console.log(quantity);
  })  */
  


  
  $("button#add").on("click", function() {
    
    let parent = $(this).siblings("h5");
    
    /* console.log(parent); */
    /* console.log(parent[2].innerHTML); */
    /* 
    console.log(parent[0].innerText);
    console.log(parent[1].innerText); */
    
    let temp = localStorage.getItem("basket");
    if (temp != null) {
      let cart = JSON.parse(temp);

      cart.push({
        name: parent[0].innerText,
        id: parent[1].innerText,
        price: parent[2].innerText
        /* quantity: */
      });
      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
    } else {
      let buyBasket = [];
      buyBasket.push({
        name: parent[0].innerText,
        id: parent[1].innerText,
        price: parent[2].innerText 
      });
      let cart = JSON.stringify(buyBasket);
      localStorage.setItem("basket", cart);
    }
  });




  /* remove items from lista */

  $(".table").on("click", "span", function () {

    let removItem = $(this).parents('tr').fadeOut(500, function () {
      $(this).remove();
      localStorage.removeItem(removItem);
    });
  })

  $('.removeAll').on('click', function () {
    localStorage.removeItem('basket');

    location.reload();
    
  });


  /* Total price */


/* Buy btn */

  $("#buyBtn").on("click", function () {
    
    $("#alert").removeAttr("style")
    localStorage.removeItem('basket')

    location.reload();
  })

}); //Ready
