// add/edit modal
var addEditModal = document.querySelector(".addEditModal");
var closeaddEditButton = document.querySelector(".addEditModal .close-button");

// modal>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
$(".productManager").click(function(event){
  var target = event.target;//must be button
  //if target is button with class= "cart"
  if ($(target).is("img")){
  var product = $(target).parents(".product");
  EditProduct(product);
    }//end of if
});
// when manager clicks on .addProduct button
$(".addProduct").click(function(){
  AddProduct();
})
function EditProduct(product){
  if(product!=undefined){
  // product
var prodImage = $(product).find("img")[0].outerHTML;
var prodName = $(product).find(".name").text();
var prodPrice = $(product).find(".price").text();
var prodCode = $(product).find(".code").text();
var prodFilter = $(product).find(".filters").text();
var prodCharacteristics = $(product).find(".characteristics").text();
// store product data to array:
var productData = [prodImage, prodName, prodPrice, prodCode, prodFilter, prodCharacteristics];

drawAdminModal(productData);
  }
}
function AddProduct(){
  // set all parameters to ""
  var prodImage = "";
  var prodName = "";
  var prodPrice = "";
  var prodCode = "";
  var prodFilter = "";
  var prodCharacteristics = "";
  // store product data to array:
  var productData = [prodImage, prodName, prodPrice, prodCode, prodFilter, prodCharacteristics];

  drawAdminModal(productData);
}
function drawAdminModal(productData){
  // main variables of this function
  // array of chracteristics
  var characteristicsArray=[];
  // html text that i paste to appropriate textarea
  var  characteristicsHtml=" ";
  // collact prodact data
    var image= productData[0];
    var name= productData[1];
    var price= productData[2];
    var code= productData[3];
    var filter= productData[4];
    var characteristics= productData[5];
    // try to parse characteristics json data
    try{
   characteristicsArray =JSON.parse(characteristics);}catch(e){
     // error occurs usually when characteristics=="";
   }
  characteristicsHtml= characteristicsArray.join("\n");
  // image that manager can paste to DB
    var managerModalHtml = "<span>зображення товару:</span>";
    managerModalHtml+="<div class=\"imgContainer\" contentEditable=\"true\">"+
    image+
    "</div>";//end of imgContainer
    managerModalHtml+="<div class=\"productData\">"+
    "<span>назва товару:</span>"+
    "<input class=\"productName\" type=\"text\" value=\""+name+"\">"+
    "<span>ціна:</span>"+
    "<input class=\"productPrice\" type=\"text\" value=\""+price+"\">"+
    "<span>код товару:</span>"+
    "<input class=\"productCode\" type=\"text\" value=\""+code+"\">"+
    "<span>фільтр товару:</span>"+
    "<input class=\"productFilter\" type=\"text\" value=\""+filter+"\">"+
    // characteristics
    "<span>Інгредієнти:</span>"+
    "<textarea class=\"productCharacteristics\" rows=\"4\">"+characteristicsHtml+"</textarea>"+
    "</div>";

    managerModalHtml+="<div class=\"saveContainer\">"+
    "<button class=\"save\">зберегти</button>"+
    "<button class=\"delete\">видалити</button>"+
    "</div>";

  $(".addEditModal .modal-content").html(managerModalHtml);
  // show modal
    addEditModal.classList.toggle("show-modal");
}
// when manager click on save button
$(".addEditModal").click(function(event){
  // var myModal=this;
  var target = event.target;
  if($(target).is(".save")){
    // manager clicks eectly on save button
    var productDataArray = collectProductData();
    // call to addEditProduct.php
    $.ajax({
      url:"app/addEditProduct.php",
      data:{
        "image":productDataArray[0],
        "name":productDataArray[1],
        "price":productDataArray[2],
        "code":productDataArray[3],
        "filter":productDataArray[4],
        "characteristics":productDataArray[5]
      },
      type:"POST",
      success:function(){
        // close modal
          addEditModal.classList.toggle("show-modal");
          // refresh products
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
      }
    })
  }
  if($(target).is(".delete")){
    // manager clicks eectly on save button
    var productDataArray = collectProductData();
    // call to addEditProduct.php
    $.ajax({
      url:"app/deleteProduct.php",
      data:{
        "code":productDataArray[3],
      },
      type:"POST",
      success:function(){
        // close modal
          addEditModal.classList.toggle("show-modal");
          // refresh products
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
      }
    })
  }
})
// collect product input data
 function collectProductData(){
   // output array
   var productArray=[];

   var prodImage = $(".addEditModal").find("img")[0].outerHTML;
   var prodName = $(".addEditModal").find(".productName").val();
   var prodPrice = $(".addEditModal").find(".productPrice").val();
   var prodCode = $(".addEditModal").find(".productCode").val();
   var prodFilter = $(".addEditModal").find(".productFilter").val();
   // only inicizlyze product characteristics
   var prodCharacteristics = [];
   var prodCharacteristicsString = $(".addEditModal").find(".productCharacteristics").val();
   // collect product charackteristics into array
   prodCharacteristics = prodCharacteristicsString.split("\n");

   prodCharacteristicsJSON = JSON.stringify(prodCharacteristics);

   productArray.push(prodImage);
   productArray.push(prodName);
   productArray.push(prodPrice);
   productArray.push(prodCode);
   productArray.push(prodFilter);
   productArray.push(prodCharacteristicsJSON);
// return output productArray data
return productArray;
 }
 $(closeaddEditButton).click(function(){
   // close modal
     addEditModal.classList.toggle("show-modal");
 })
