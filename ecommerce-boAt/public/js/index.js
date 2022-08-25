function addtocart(pid, pname, discountprice, originlprice, productImg){
    let cart=localStorage.getItem("cart");
    if(cart == null){
        let products = [];
        let product = {productId:pid, 
                       productName:pname,
                       productQuantity:1,
                       productprice:discountprice,
                       orgprice:originlprice,
                       pic:productImg}

        products.push(product)
        localStorage.setItem("cart", JSON.stringify(products))
        console.log("product is added for the first time")
    }
    else{
        let pcart = JSON.parse(cart);
        let oldProduct = pcart.find((item) => item.productId == pid)
        if(oldProduct){
            oldProduct.productQuantity = oldProduct.productQuantity + 1;
            pcart.map((item) => {
                if(item.productId == oldProduct.productId){
                    item.productQuantity = oldProduct.productQuantity;
                }
            })
            localStorage.setItem("cart", JSON.stringify(pcart));
            console.log("product quantity is increased")
        }
        else{
            let product = {productId:pid, 
                       productName:pname,
                       productQuantity:1,
                       productprice:discountprice,
                       orgprice:originlprice,
                       pic:productImg}

            pcart.push(product)
            localStorage.setItem("cart", JSON.stringify(pcart));
            console.log("product is added")
        }
    }
    updateCart()
}

function updateCart(){
    let cartString = localStorage.getItem("cart")
    let cart = JSON.parse(cartString);
    console.log(cart)
    if(cart==null || cart.length == 0){
        $(".cart-quantity").html('0');
        $('.cart-items').html(`<h1 style="margin-top:5rem;padding:0.5rem; display:flex;justify-content:center;align-items:center; background-color:white;color:black">Your cart is empty</h1>
                               <a href="/dashboard" style="text-decoration:none;margin-left:8rem"><button style="border:none;background-color:red; border-radius:10px; padding:0.5rem;color:white; width:50%">Start Shopping</button></a>`)
        $('.total-price').html(`
            <div style=" background-color:white; color:black; padding:0.5rem">Total Price:<span style="float:right">${0}</span></div>
         `)
    }
    else{
        $(".cart-quantity").html(`${cart.length}`)
        let table = 
            `
                <table class='table'>
                    <thead class="thread-light">
                        <tr>
                        <th></th>
                        <th>Your Cart</th>
                        </tr>
                    </thead>
            `;
            cart.map((item) => {
                table +=
                    `
                    <tr>
                        <td><img style="height:90px" src='${item.pic}'></td>
                        <td>
                            <h1 style="background-color:white; color:black">${item.productName}</h1>
                            <span style="color:red">₹${item.productprice}</span><span style="color:gray; text-decoration: line-through;">₹${item.orgprice}</span>
                            <h2 style="background-color:white;color:black"><span style="font-weight:bold"> Qty: ${item.productQuantity}</span><i onclick="deletecart(${item.productId})" style="float:right;color:gray" class="fa-solid fa-trash-can"></i></h2>
                    </tr>
                    `
            })
            table = table + `</table>`
            let value = 0
            $('.cart-items').html(table)
            cart.map((item) => {
               value += parseInt(item.productprice.replace(/,/g, ''))*parseInt(item.productQuantity) 
            })
            console.log(value)
            $('.total-price').html(`
            <div style=" background-color:white; color:black; padding:0.5rem">Total Price:<span style="float:right">${value}</span></div>
         `)
            
    }
}

function deletecart(pid){
   let cart = JSON.parse(localStorage.getItem("cart"));
   let newcart = cart.filter((item) => item.productId != pid)
   localStorage.setItem("cart", JSON.stringify(newcart))
   updateCart()
}

function myfunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

$(document).ready(function(){
    updateCart()
})
