<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <!-- jQuery 3.3 -->
    <script src="js/JQuery/jquery-3.2.1.js"></script>
    <!--  ajax throught jquery-->
    <script src="js/JQuery/Ajax/jquery.min.js"></script>
    <link rel="stylesheet" href="css/admin.css">
    <link rel="stylesheet" href="css/modalAdmin.css">
  </head>
  <body>
    <!-- when user click this button orders are appiared -->
    <button class="toOrders hide">до замовлень</button>
    <!-- when user click this button all existed products are appiared -->
    <button class="manageProducts">керувати товарами</button>
    <!-- to addd product user must click this button -->
    <button class="addProduct hide">додати товар</button>
    <div class="orders">
    </div>
    <div class="productManager">
    </div>
    <!-- Modal window -->
    <div class="addEditModal modal">
      <span class="close-button">&times;</span>
      <div class="modal-content">
      </div>
    </div>
    <!-- for auto resize text height equals it's content -->
<script src="js/autosize.min.js"></script>
<script type="text/javascript" src="js/admin.js"></script>
<script type="text/javascript" src="js/addEditModal.js"></script>
  <script type="text/javascript">
    window.onload=function(){
      uploadOrders();
    }
  </script>
  </body>
</html>
