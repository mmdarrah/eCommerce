




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
        <p class="card-text"><h5>${items[i].price} Kr</h5></p>
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
                  ${cart[i].image} class="card-img-top"></td>
                <td>${cart[i].name}</td>
                <td>${cart[i].price}</td> 
                <td><input  id="num" type="number" name="quantity" min="1" max="10"></input></td>
                <td> <td><a id="${cart[i].id}"href="#"><span><i class="fas fa-trash-alt"></i></span></a></td></td>
              </tr>
       
        
        `;
      }


      /* Total price start*/
      if (list == null) {
        let cartPrice = localStorage.getItem("basket");
        if (cartPrice != null) {
          let total = [];


          for (let i = 0; i < cart.length; i++) {
            /* console.log(cart[i].price); */
            total.push(cart[i].price);
          }
          /* console.log(total); */

          var result = total.map(function (x) {
            return parseInt(x, 10);
          });
          /* console.log(result); */
          const totSum = result.reduce(add);
          function add(accumulator, a) {
            return accumulator + a;
          }

          /* console.log(totSum); */
          let totResult = "Total price are: " + totSum + " kr"
          let totalPrice = document.getElementById("total-price");
          totalPrice.innerHTML = totResult;
        }
      }
            /* Total price end */



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


$(document).ready(function () {

  




  $("button#add").on("click", function () {

    let parent = $(this).siblings("h5");
    let image = $(this).parents().find("#img").children("img");
    let imageSource = image[0].currentSrc;
    /* console.log(imageSource); */
    let allParents = $(this).siblings();
    let inputValue = allParents[4].value;



    let btnId = $(this).siblings("h5");
    /* console.log(btnId); */
    let clickId = allParents[3].innerText;
        /* console.log(clickId); */








    if (inputValue == 0 || inputValue == "") {
      inputValue = 1
    }
    //TODO
    //here you shoud check if the input value is undifined then you set 1

    /* console.log(parent); */
    /* console.log(parent[2].innerHTML); */
    /* 
    console.log(parent[0].innerText);
    console.log(parent[1].innerText); */

    let cartFromLocalStorage = localStorage.getItem("basket");


    if (cartFromLocalStorage != null) {

      // if we already have the cart in the local storage



      let cart = JSON.parse(cartFromLocalStorage);
      //TODO
      //here you need to check if the id exist in the list

      //if exists then get the item there should be a function in jave script that removes an item
      //from a list and then you should calculate the quanity

      for (let i = 0; i < cart.length; i++) {
        /* console.log(cart[i].id); */
        if (cart[i].id == clickId) {
          console.log("test");
        }


      }


      cart.push({
        name: parent[0].innerText,
        id: parent[1].innerText,
        price: parent[2].innerText,
        image: imageSource,
        quantity: inputValue
        /* quantity: */
      });
      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
    } else {
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
