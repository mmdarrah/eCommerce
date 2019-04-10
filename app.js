
                     /* AJAX start*/

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let response = JSON.parse(xhttp.responseText);
    let items = response.items;

    let output = "";



    for (let i = 0; i < items.length; i++) {
      output += ` <div id="img"  class='col-md-4'   >
        <IMG  src= 
        ${items[i].image} style="width:200px;hight:auto; class="card-img-top" >
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
                    
              <tr id="${cart[i].id}" class="num" >
                <td><IMG style="width:80px;hight:auto;"src=
                  ${cart[i].image} class="card-img-top"></td>
                <td>${cart[i].name}</td>
                <td>${cart[i].price * cart[i].quantity} Kr</td> 
                <td>${cart[i].quantity} st</td> 
                <td><input  id="${cart[i].id}" type="number" name="quantity" min="1" max="10" value="${cart[i].quantity}"></input></td>
                <td> <a "href="#"><span><i class="fas fa-trash-alt"></i></span></a></td>
              </tr>
       
        
        `;
      }

                                

      










      /* Total price start*/


      function totalPrice() {
        if (list == null) {
          let cartPrice = localStorage.getItem("basket");
          if (cartPrice != null) {
            let total = [];


            for (let i = 0; i < cart.length; i++) {
              /* console.log(cart[i].price); */
              total.push((cart[i].price * cart[i].quantity));
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

      }

      /* Total price end */
      totalPrice()


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
/* AJAX end*/

$(document).ready(function () {






  $("button#add").on("click", function () {

    let parent = $(this).siblings("h5");
    let image = $(this).parents().find("#img").children("img");
    /*  console.log(image); */
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


    /* console.log(parent); */
    /* console.log(parent[2].innerHTML); */
    /* 
    console.log(parent[0].innerText);
    console.log(parent[1].innerText); */

    let cartFromLocalStorage = localStorage.getItem("basket");


    if (cartFromLocalStorage != null) {

      // if we already have the cart in the local storage



      let cart = JSON.parse(cartFromLocalStorage);
     

      //if exists then get the item there should be a function in jave script that removes an item
      //from a list and then you should calculate the quanity
      let ItemExists = false;
      let curentIndex = 0;
      for (let i = 0; i < cart.length; i++) {
        /* console.log(cart[i].id); */
        if (cart[i].id == clickId) {
          /* console.log("test"); */
          ItemExists = true;
          curentIndex = i;
          break;

        }
      }

      if (ItemExists) {

        let newQua = +cart[curentIndex].quantity + +inputValue
        let newPrice = cart[curentIndex].price;

        cart.splice(curentIndex, 1);

        /* console.log(newPrs); */

        /* this.quantity = newQua */

        cart.push({

          name: parent[0].innerText,
          id: parent[1].innerText,
          price: newPrice,
          image: imageSource,
          quantity: newQua

        });



      } else {

        cart.push({
          name: parent[0].innerText,
          id: parent[1].innerText,
          price: parent[2].innerText,
          image: imageSource,
          quantity: inputValue

        });
      }


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
    let cartFromLocalStorage = localStorage.getItem("basket");
    let cart = JSON.parse(cartFromLocalStorage);

    let xItem = $(this).parents('tr').fadeOut(500, function () {
      

      removItemId = xItem[0].id;
      for (let i = 0; i < cart.length; i++) {

        if (cart[i].id == removItemId) {

          cart.splice(i, 1);
          /* if (cart.length == 0){
            localStorage.removeItem('basket')
          } */



        }
      }
      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
      location.reload();

      

    });
  })

  $('.removeAll').on('click', function () {
    localStorage.removeItem('basket');

    location.reload();

  });





  /* Buy btn */
  $(".buyBtn").click(function () {
    /* alert("test") */
    var x = $("form").serializeArray();
    $.each(x, function (i, field) {
      $("#name").append(field.name + ": " + field.value + " "+"<br>");
    });
    
  });






 /* $("#buyBtn").on("click", function () {

    let $form = $("form").children("input")
    console.log($form);
     $("#alert").removeAttr("style") */
    /* localStorage.removeItem('basket')
       location.reload(); 

  })*/



  $(".num").on("change", function () {

    // let $input = $(this).val()
    // console.log($input);
    let $input = $(this).children().find("input");
    let clickId = $input[0].id;
    let inputVal = $input[0].value;
    console.log(clickId);
    let cartFromLocalStorage = localStorage.getItem("basket");

    let cart = JSON.parse(cartFromLocalStorage);
    
    let ItemExists = false;
    let curentIndex = 0;
    for (let i = 0; i < cart.length; i++) {
      /* console.log(cart[i].id); */
      if (cart[i].id == clickId) {
        /* console.log("test"); */
        ItemExists = true;
        curentIndex = i;
        break;

      }
    }

    if (ItemExists) {

      let newQua = inputVal
      let newPrice = cart[curentIndex].price;
      let newname = cart[curentIndex].name;
      let newimage = cart[curentIndex].image;

      cart.splice(curentIndex, 1);
      cart.push({

        name: newname,
        id: clickId,
        price: newPrice,
        image: newimage,
        quantity: newQua

      });

      cart = JSON.stringify(cart);
      localStorage.setItem("basket", cart);
      location.reload();





    }

    
  })










}); //Ready
