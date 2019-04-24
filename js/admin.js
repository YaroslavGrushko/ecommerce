  $(".toOrders").click(function(){
    // switch buttons
    // show .manageProducts and .commentsButton buttons
  $(".manageProducts").removeClass("hide");
  // hide .toOrders button
  $(".toOrders").addClass("hide");
  // hide add product button
  $(".addProduct").addClass("hide");
  // hide product manager div
  $(".productManager").html("");
  // upload orders
  uploadOrders();
})
// upload all orders from buyers
function uploadOrders(){
  $.ajax({
    url:'app/selectFromOrders.php',
    data:' ',
    type:'POST',
    success:function(data){
      var ordersArray = $.parseJSON(data);
      drawOrders(ordersArray);
    }
  });
}
// draw all orders
function drawOrders(ordersArray){
  var ordersHtml=" ";
  if(ordersArray[0]!=null){
var ids = ordersArray[0];
var names = ordersArray[1];
var emails = ordersArray[2];
var phones = ordersArray[3];
var orders = ordersArray[4];

  for(var i=0;i<ordersArray[0].length;i++){
    var id = ids[i];
    var name = names[i];
    var email = emails[i];
    var phone = phones[i];
    var orderJSON = orders[i];
    ordersHtml+="<div class=\"order\">"+
    "<div class=\"aboutBuyer\">"+
    "<div class=\"buyer highlight\"><span class=\"buyerTitle\">ID замовлення</span><span class=\"id\">"+id+"</span></div>"+
    "<div class=\"buyer\"><span class=\"buyerTitle\">ім'я покупця</span>"+name+"</div>"+
    "<div class=\"buyer\"><span class=\"buyerTitle\">е-мейл</span>"+email+"</div>"+
    "<div class=\"buyer\"><span class=\"buyerTitle\">номер телефону</span>"+phone+"</div>"+
    "</div>"+
    "<p class=\"productsTitle\">товари:</p>"+
    "<div class=\"products\">";
  var  order = $.parseJSON(orderJSON);
    order.forEach(function(item,orderIndex,specificallyOrders){
      var image= item[0];
      var name= item[1];
      var price= item[2];
      var code= item[3];
      ordersHtml+="<div class=\"adminCartProduct\">";
      ordersHtml+=image;
      ordersHtml+="<div class=\"aboutProduct\">"+
      "<p>"+name+"</p>"+
      "<p>"+price+"</p>"+
      "<p>"+code+"</p> </div>"+
      "</div>";
    });
    ordersHtml+="</div>"+
    "</div>";
  };
}
  $(".orders").html(ordersHtml);

}
// when manager wants to delete selected order as finished

$(".orders").click(function(event){
  // when manager clicks on order's id
  if($(event.target).is(".buyer.highlight")){
  var selectedIdfromPage = $(event.target).find( ".id" ).text();
  var selectedID = parseInt(selectedIdfromPage, 10);
  OrderDeletePopup(selectedID.toString());
  }
})
function OrderDeletePopup(selectedID) {

    if (confirm("Хочете видалити це замовлення як виконане?")) {
       deleteOrderById(selectedID);
    } else {
// manager does not want delete order
    }
}
function deleteOrderById(selectedID){
  $.ajax({
    url:"app/deleteOrder.php",
    data:{
      "orderId":selectedID
    },
    type:"POST",
    success:function(){
      // alert("вибране замовлення видалене :)");
      // upload orders
      uploadOrders();
    }
  })
}

$(".manageProducts").click(function(){
  $.ajax({
    url:"app/selectFrom.php",
    type:"POST",
    data:" ",
    success:function(data){
      var dataArray = $.parseJSON(data);
      // for displaying existed tables
      // displayTables(dataArray[0]);
      // display products that market has
      displayAdminContent(dataArray[1]);
    }
  });
  // switch buttons
$(".addProduct").removeClass("hide");
$(".manageProducts").addClass("hide");
$(".toOrders").removeClass("hide");
})

// display products that market has
function displayAdminContent(content){
  if(content[0]!=null){
  var productManagerHtml = " ";
  var productsCount = content[0].length;
  var names = content[0];
  var codes = content[1];
  var images = content[2];
  var prices = content[3];
  var filters = content[4];
  var characteristics = content[5];
  var counter=0;//row counter
  var countInRow = 3;//number products in one row
  for(var i=0;i<productsCount;i++){
    if(counter%countInRow==0){//than new row
    productManagerHtml+="<div class=\"productRow\">";
    }
    var filter = filters[i];
    productManagerHtml+="<div class=\"product "+filter+"\">" +
    "<div class=\"img-container\">"+
    // "<img src=\"images\\"+images[i]+"\" class=\"image\"\" alt=\""+names[i]+"\">"+
    images[i]+
    "</div>";
    productManagerHtml+=" <p class=\"code\">"+codes[i]+"</p>";
    productManagerHtml+=" <p class=\"name\">"+names[i]+"</p>";
    productManagerHtml+=" <p class=\"price\">"+prices[i]+"</p>";
    productManagerHtml+=" <p class=\"filters\" hidden>"+filter+"</p>";
    productManagerHtml+=" <p class=\"characteristics\" hidden>"+characteristics[i]+"</p>";
    productManagerHtml+=" </div>";
    if((counter%countInRow-(countInRow-1))==0){//than end of new row
    productManagerHtml+="</div>";
    }
    counter++;
  }
  if(counter%countInRow!=0&&productsCount!=0){
     productManagerHtml+="</div>";
   }
  // clear orders
  $(".orders").html("");
  // show up products characteristics
  $(".productManager").html(productManagerHtml);
  }
}
