// main variables:
// main content array variable
var dataArray = [];
// initialize and upload content
uploadTable("app/selectFrom.php");
// initialize and upload content
function uploadTable(url){
  $.ajax({
    url:url,
    type:"POST",
    data:" ",
    success:function(data){
       dataArray = $.parseJSON(data);
      displayTables(dataArray[0]);
      // display products that market has
      displayContent(dataArray[1]);
    }
  });
}
function displayTables(tables){
  var tablesHtml = " ";
  tables.forEach(function(item, index, array){
    tablesHtml+="<b>"+item+"</b>";
  })
  $(".tables").html(tablesHtml);
}
// display products that market has
function displayContent(content){
  if(content[0]!=null){
  var productHtml=" ";
  var productsCount = content[0].length;
  var names = content[0];
  var codes = content[1];
  var images = content[2];
  var prices = content[3];
  var filters = content[4];
  var characteristics = content[5];
 
  var counter=0;//row counter
  var countInRow = 2;
  for(var i=0;i<productsCount;i++){

    if(counter%countInRow==0)
      productHtml+="<div class=\"productRow\">";

    var filter = filters[i];
    productHtml+="<div class=\"product "+filter+"\">" +images[i];
    productHtml+=" <p class=\"code\">"+codes[i]+"</p>";
    productHtml+=" <p class=\"name\">"+names[i]+"</p>";
    productHtml+=" <p class=\"price\">"+prices[i]+"</p>";
    productHtml+=" <p class=\"characteristics\" hidden>"+characteristics[i]+"</p>"
    productHtml+=" <button class=\"cart\">у кошик <i class=\"fas fa-shopping-basket\"></i></button>";
    productHtml+=" </div>";

    if((counter%countInRow)-1==0){//than end of new row
    productHtml+="</div>";//close .productRow
    }
        counter++;
  }
  // defense from unclosed .productRow
    if((counter-1)%2==0&&names.length!=0)productHtml+="</div>";

  // $(productHtml).appendTo(".products");
  $(".products").html(productHtml);
  }
}
// ////////////////////////////////////////
// this code is responsable for ctrl+s key press handling
// with purpose to save myCanvas data to database
$(window).bind('keydown', function(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            event.preventDefault();
            //ctrl+s is typed, so insert products
            $.ajax({
              url:"app/insertProducts.php",
              type:"POST",
              data:" ",
              success:function(data){
                // upload content
                uploadTable("app/selectFrom.php");
              }
            })
            // erease .tables div
            $(".tables").text("");
            break;
        }
    }
});
// open characteristics page when click on image
$(".products").click(function(event){
  var target = event.target;
  if($(target).is("img")){


    // find current .product div
    var currProduct = $(target).parent(".product");
    // find current image and it's name
    var image =  $(currProduct).find("img")[0].outerHTML;
    var name =  $(currProduct).find(".name")[0].outerHTML;
    var code = $(currProduct).find(".code").text();
    //find characteristics
    // var characteristics = ["стійкий","волговідталкуючий","приємний дизайн","доступна ціна"];
    var currCharacteristicsJSON = $(currProduct).find(".characteristics").text();
    var currCharacteristics=  JSON.parse(currCharacteristicsJSON);
    var characteristicsHtml = " ";
// left part page
    characteristicsHtml+="<div class=\"characteristics-container\">";
    characteristicsHtml+="<div class=\"left-charactersistics\">"+
    "<button class=\"backButton\">назад</button>"+
    image+
    name+
     "<p class=\"code\" hidden>"+code+"</p>"+
    "</div>";
    // Right part page
    characteristicsHtml+="<div class=\"right-charactersistics\">"+
    "<h3>Інгредієнти</h3>"+
    "<ul>";
$(currCharacteristics).each(function(index, element){
  characteristicsHtml+="<li>"+element+"</li>";
})
     characteristicsHtml+="</ul>"+
    "</div>"+
    "</div>";//end of .characteristics-container
    characteristicsHtml+="<div class=\"commentsDiv hide\"></div>"
    // load characteristics content to .products div
    $(".products").html(characteristicsHtml);
    // hide search bar and .currentFilters div
    $(".wrap").addClass("hide");
    $(".slider").addClass("hide");
  }
})
// if user click on .backButton to back to main page
$(".products").click(function(event){
  var target = event.target;
  // if target is .backButton
  if($(target).is(".backButton")){
    // show search bar (.wrap), .filters div and .currentFilters div
      $(".wrap").removeClass("hide");
      $(".slider").removeClass("hide");
    //  upload content to .products
    uploadTable("app/selectFrom.php");
  }
})