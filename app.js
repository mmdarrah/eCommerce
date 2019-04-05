

/*Ajax request för att hämta data från JSON fil */


let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
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
        items[i].id}</h5><input  id="num" type="number" name="quantity" min="1" max="10" value="1"></input>
        <p class="card-text"><h5>${items[i].price}</h5></p>
        <button type="button" id="add" class="btn btn-success btn-lg btn-block btn-sm">Köpa</button>
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
              basketOutput += ` 
                    
              <tr>
                <td><IMG style="width:80px;hight:auto;"src=
                  ${items[i].image} class="card-img-top"></td>
                <td>${cart[i].name}</td>
                <td>${cart[i].price}</td> 
                <td><input  id="num" type="number" name="quantity" min="1" max="10"></input></td>
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










/* jQuery start here */

$(document).ready(function () {



  $("button#add").on("click", function () {

    let parent = $(this).siblings("h5");

    let image = $(this).parents().find("#img").children("img");
    let imageSource = image[0].currentSrc;
    /* console.log(imageSource); */

    let allParents = $(this).siblings();
    let inputValue = allParents[4].value;

    if (inputValue == 0 || inputValue == "") {
      inputValue = 1
    }

    /* console.log(parent); */
    /* console.log(parent[2].innerHTML); */
    /* 
    console.log(parent[0].innerText);
    console.log(parent[1].innerText); */

    let cartFromLocalStorage = localStorage.getItem("basket");


    if (cartFromLocalStorage != null) {

      // if we already have the cart in the local storage



      let cart = JSON.parse(cartFromLocalStorage);
      /* console.log(cart); */

      /* cart.forEach(id => {
        if(id == null)


      }); */
      //TODO
      //here you need to check if the id exist in the list

      //if exists then get the item there should be a function in javescript that removes an item
      //from a list and then you should calculate the quanity


      cart.push({
        name: parent[0].innerText,
        id: parent[1].innerText,
        price: parent[2].innerText,
        image: imageSource,
        quantity: inputValue
        
      });


      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
          } 
          else {
      // if the local storage does not contain a cart

      //add the item directly
      let buyBasket = [];
      buyBasket.push({
        name: parent[0].innerText,
        id: parent[1].innerText,
        price: parent[2].innerText,
        image: imageSource,
        quantity: inputValue
      });
      let cart = JSON.stringify(buyBasket);
      localStorage.setItem("basket", cart);
    }
  });







  /* remove all items from basket */

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





  /* Buy btn */

  $("#buyBtn").on("click", function () {

    $("#alert").removeAttr("style")
    localStorage.removeItem('basket')

    location.reload();
  })



  /* Total price */























}); //Ready




/* function loadItems() {
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
    console.log(loadItems());  */
