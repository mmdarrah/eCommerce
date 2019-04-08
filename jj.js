

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
        <h4 style="display: none;">${
                items[i].id}</h4><input  id="num" type="number" name="quantity" min="1" max="10" value="1"></input>
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
                    
              <tr >
                <td><IMG style="width:80px;hight:auto;"src=
                  ${cart[i].image} class="card-img-top"></td>
                <td>${cart[i].name}</td>
                <td>${cart[i].price} kr</td> 
                <td><input  id="num" type="number" name="quantity" min="1" max="10"></input></td>
                <td><a id="${cart[i].id}"href="#"><span><i class="fas fa-trash-alt"></i></span></a></td>
                </tr>
                `;

                /*  <td><a onclick="deleteItem(id) "href="#"><span><i class="fas fa-trash-alt"></i></span></a></td> */

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


/* Delete clicked item */

/* function deleteItem(id){
  console.log(id);
  let cart = localStorage.getItem("basket");
  cart = JSON.parse(cart);
   for (let i = 0; i < cart.length; i++) { 
    
    
     console.log(cart[i].id); 


      if (cart[i].id === id){
      console.log("test");
      cart.splice(i, 1)
       cart = JSON.stringify(cart);
       localStorage.setItem("basket", cart);

    }
  }
} */



/* jQuery start here */

$(document).ready(function () {



    $("button#add").on("click", function () {

        let parent = $(this).siblings("h5");
        let btnId = $(this).siblings("h4");
        let clickId = btnId[0].innerText;
        /* console.log(clickId); */

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

            for (let i = 0; i < cart.length; i++) {
                /* console.log(cart[i].id); */
                if (cart[i].id == clickId) {
                    console.log("test");
                }


            }







            //TODO
            //here you need to check if the id exist in the list

            //if exists then get the item there should be a function in javescript that removes an item
            //from a list and then you should calculate the quanity

            /*  for (let i = 0; i < cart.length; i++) {
               if (cart[i].id == null) {
       
       
                 cart.push({
                   name: parent[0].innerText,
                   id: parent[1].innerText,
                   price: parent[2].innerText,
                   image: imageSource,
                   quantity: inputValue
       
                 });
       
              } else if (cart[i].id === parent[1].innerText) {
       
                console.log("test");
       
       
                let newQuan = (cart[i].quantity += cart.inputValue);
       
                console.log(newQuan);
                 
               }
               
             }
        */

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








    /* remove clicked item from basket */
    $(".table").on("click", "span", function () {

        let removItem = $(this).parents('tr').fadeOut(500, function () {
            $(this).remove();
            localStorage.removeItem(removItem);
        });
    })




    /* remove all items from basket */
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
