// main variables:
// main content array variable
host = window.location.hostname
uploadContent();
// initialize and upload content
function uploadContent() {
    $.ajax({
        //   // тут замість app/selectFrom.php напиши адресу до свого серверу 
        //   // (що буде повертати адресу картинки у форматі json)
        // url:"http://"+host+"/cloud-api/meals",
        url: "http://" + host + ":8080/meals",

        type: "GET",
        crossDomain: true,
        success: function(data) {

            var dataArray = []
            var names = [];

            dataArray = data._embedded.meals;
            for (i in dataArray) {
                names.push(dataArray[i].name);
            }
            //     //  let's display content
            displayContent(names);
        }
    });
}

function displayContent(dataArray) {
    imagesHtml = "<b>meals:<ul>";
    dataArray.forEach(function(item, index, dataArray) {
        imagesHtml += "<li>" + item + "</li>";
    });
    imagesHtml += "</ul></b>"
        // test-mages - is our class in index.html div 
    $(".test-div").html(imagesHtml);
}



// ===================================================
// collect product input data
function collectProductData() {
    // output array
    var productArray = [];

    var prodName = $(".addEditModal").find(".productName").val();
    var prodAmount = $(".addEditModal").find(".productAmount").val();

    productArray.push(prodName);
    productArray.push(prodAmount);
    // return output productArray data
    return productArray;
}

// when manager click on save button
$(".addEditModal").click(function(event) {
    // var myModal=this;
    var target = event.target;
    if ($(target).is(".save")) {
        // manager clicks eectly on save button
        var productDataArray = collectProductData();
        // call to addEditProduct.php
        $.ajax({
            // url:"http://"+host+"/cloud-api/meals",
            url: "http://" + host + ":8080/meals",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "name": productDataArray[0],
                "amount": productDataArray[1],
                "expirationDate": null,
                "discount": null,
            }),
            type: "POST",
            crossDomain: true,
            success: function() {
                // refresh products
                uploadContent();
            }
        })
    }
})