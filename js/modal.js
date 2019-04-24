// cart modal
var cartModal = document.querySelector(".cartModal");
var closeCartButton = document.querySelector(".cartModal .close-button");
var showCartButton = document.querySelector(".showCartButton");
// checkout modal
var checkoutModal = document.querySelector(".checkoutModal");
var closeCheckoutButton = document.querySelector(".checkoutModal .close-button");
// comment modal
var commentModal = document.querySelector(".commentModal");
var closeCommentButton = document.querySelector(".commentModal .close-button");
// cart modal>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// add product from main page
$(".products").click(function(event){
  var target = event.target;//must be button
  if ($(target).is(".cart"))//if target is button with class= "cart"
  var product = $(target).parent();
  AddToCart(product);
});
// add to cart:
function AddToCart(product){
  if(product!=undefined){
  // product
var prodImage = $(product).find("img")[0].outerHTML;
var prodName = $(product).find(".name").text();
var prodPrice = $(product).find(".price").text();
var prodCode = $(product).find(".code").text();
// store product data to Session:
var productData = [prodImage, prodName, prodPrice, prodCode];
// open popup
var cartArray=addToSession(productData);
drawModal(cartArray);
  }
}
// open/close cart:
function OpenCart(){
// open popup
var cartArray=addToSession();
drawModal(cartArray);
// hide .showCartButtonContainer and .filters
  $(".showCartButtonContainer").addClass("hide");
}
// add to session product and retriev all products from session
function addToSession(productData){
var cartArray=[];
// let's try to get cartArray session variable
  try{cartArray= JSON.parse(sessionStorage['cartArray']);}
  catch(e){}
// add current product to session array
  if(productData!=undefined)cartArray.push(productData);
  sessionStorage['cartArray'] = JSON.stringify(cartArray);

return cartArray;
}
function toggleCart(){
  cartModal.classList.toggle("show-modal");
  // show .showCartButtonContainer and .filters divs
  $(".showCartButtonContainer").removeClass("hide");
}
function drawModal(cartArray){
  var cartHtml="<div class=\"deleteCartContainer\">"+
  "<button class=\"deleteCart\">очистити кошик</button>"+
  "</div>";
  cartHtml+="<div class=\"cartProducts\">";
  cartArray.forEach(function(element,index,arr){
    var image= element[0];
    var name= element[1];
    var price= element[2];
    var code= element[3];
    cartHtml+="<div class=\"cartProduct\">";
    cartHtml+="<div class=\"imgContainer\">"+
    image+
    "</div>";//end of imgContainer
    cartHtml+="<p>"+name+"</p>";
    cartHtml+="<p>"+price+"</p>";
    cartHtml+="<p>"+code+"</p>"+
    "</div>";
  });
  cartHtml+="</div>"+
    "</div>";//cartProducts end
  cartHtml+="<div class=\"checkoutContainer\">"+
  "<button class=\"checkout doubleDackerButton\">оформити замовлення</button>";

  $(".cartModal .modal-content").html(cartHtml);
  // show modal
    cartModal.classList.toggle("show-modal");
    // hide .showCartButtonContainer and filters divs
    $(".showCartButtonContainer").addClass("hide");
}
$(".cartModal").click(function(event){
  var target= event.target;
  if($(target).is(".deleteCart")){
    sessionStorage['cartArray']="";
    var successHtml="<div class=\"successContainer\">"+
    "<div class=\"row2\">У кошику нічого немає:(</div>"+
    "</div>";
    $(this).find(".modal-content").html(successHtml)
  }else{
    if($(target).is(".checkout")){
      // close cart modal
      cartModal.classList.toggle("show-modal");
      // initialize checkout html that i will paste to checkoutModal
      var checkoutHtml="<div class=\"checkoutProducts\">";
      // open products array in cart
      var cartArray=addToSession();
      // paste products from cart to checkout html
      cartArray.forEach(function(element,index,arr){
        var image= element[0];
        var name= element[1];
        var price= element[2];
        var code= element[3];
        checkoutHtml+="<div class=\"checkoutProduct\">"
        checkoutHtml+="<div class=\"imgContainer\">"+
        image+
        "</div>";
        checkoutHtml+="<p>"+name+"</p>";
        checkoutHtml+="<p>"+price+"</p>";
        checkoutHtml+="<p>"+code+"</p></div>";
      });
      // add inputs of client's contact data to checkoutHtml
        checkoutHtml+="</div>"+//end of "checkoutProducts div
      "<div class=\"buyerData\">"+
      "<span>Ваше ім'я:</span>"+
      "<input class=\"buyerName\" type=\"text\">"+
      "<span>Ваш е-мейл:</span>"+
      "<input class=\"buyerEmail\" type=\"text\">"+
      "<span>Ваш телефон:</span>"+
      "<input class=\"buyerPhone\" type=\"text\">"+
      "</div>";
        checkoutHtml+="<div class=\"chekoutButtonContainer\">"+
        "<button class=\"checkoutButton doubleDackerButton\">підтвердити замовлення</button>"+
        "</div>";
// paste checkoutHtml to checkoutModal
      $(".checkoutModal .modal-content").html(checkoutHtml);
      // show checkout modal
      checkoutModal.classList.toggle("show-modal");
    }
  }
})
$(".checkoutModal").click(function(event){
  var myModal=this;
  var target= event.target;
  if($(target).is(".checkoutButton")){
    var buyerName = $(myModal).find(".buyerName").val();
    var buyerEmail = $(myModal).find(".buyerEmail").val();
    var buyerPhone = $(myModal).find(".buyerPhone").val();
    // open products array in cart
    var cartArray=addToSession();

    // var order=[buyerName, buyerEmail, buyerPhone, cartArray];
    var cartArrayJson=JSON.stringify(cartArray);
    $.ajax({
      url:'app/insertOrder.php',
      data:{'buyerName':buyerName,
            'buyerEmail':buyerEmail,
            'buyerPhone':buyerPhone,
            'buyerOrder':cartArrayJson
      },
      type:'POST',
      success:function(data){
        var successHtml=
        "<div class=\"successContainer\">"+
        "<div class=\"row2\">Ваше замовленя відпрвлено до наших менеджерів.</div>"+
        "<div class=\"row3\">Дякуємо за увагу до нашого магазину! :)</div>"+
        "</div>";
        $(".checkoutModal .modal-content").html(successHtml);
      }
    })
  }
});
closeCartButton.addEventListener("click", toggleCart);
showCartButton.addEventListener("click", OpenCart);
// end cart modal<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// checkout modal:
function toggleCheckout(){
  checkoutModal.classList.toggle("show-modal");
  // show .showCartButtonContainer and .filters divs
  $(".showCartButtonContainer").removeClass("hide");
}
closeCheckoutButton.addEventListener("click", toggleCheckout);

