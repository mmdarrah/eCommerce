
       
       
       $(document).ready(function(){

      
       
       //Hämta items

        let $newItem = $("#newItem");
        let $addBtn  = $("#addBtn");
        let $list    = $("#list");
        


        $addBtn.click(addItem);

       /*  $newItem.keypress(function(e){
           if(e.which == 13){ */
               /* addItem(); */
            /*    alert("test");
           }
       }) */

        function addItem(){

            let $temp = $newItem.val();
            if ($temp !== ""){
                $list.prepend("<li>"+$temp+"<span><i class='fas fa-times'></i></span></li>");
                $newItem.val("");
            }
        }

        $($list).on("click", "span", function(){

            $(this).parent().fadeOut(500, function(){
                $(this).remove();
            });
        })
    });