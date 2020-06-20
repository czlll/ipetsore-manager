<template>
  <div id="container">
          <div class="content">
                  <div class="details">
                      <div class="item">
                          <label for="item-firsthev">首重</label>
                          <input id="item-firsthev" type="text">
                          <div class="bottom-line"></div>
                      </div>
                  </div>
          </div>
  </div>

</template>

<script>
  import $ from jquery //在需要使用的页面中
   $("input").focus(function(event) {
              //label动态上升，升至顶部
               $(this).siblings("label").stop().animate({"bottom": "50px"}, 500);
               //div模拟的下边框伸出，其width动态改变至input的width
               $(this).next(".bottom-line").stop().animate({"width": "400px"}, 500);
          });
          ////输入框失去焦点时
          $("input").blur(function(event) {
               //label动态下降，恢复原位
               $(this).siblings("，label").stop().animate({bottom: "10px"}, 500);
               //用div模拟的下边框缩回，其width动态恢复为默认宽度0
               $(this).next(".bottom-line").stop().animate({"width": "0"}, 500);
          });
</script>

<style scoped>
  *{
              margin:0;
              padding:0;
              box-sizing: border-box;
          }
          body{
              background-color: #333;
          }
          .content{
              width:1000px;
              height: 500px;
              margin:0 auto;
              margin-top: 200px;
              background-color: #fff;
          }
          .details {
              padding:50px 50px 0;
          }
          .details .item{
              width:400px;
              margin:20px auto;
              position: relative;
          }
          .item  label{
              font-size: 16px;
              position: absolute;
              left:2px;
              bottom:10px;
              font-family: "宋体";
              color:#777;
              cursor: text;
          }
          .item input{
              padding-top: 35px;
              width:400px;
              height: 80px;
              font-size: 20px;
              border:none;
              outline: none;
              border-bottom: 1px solid #c3c3c3;
          }
          .item .bottom-line{
              position: absolute;
              width: 0;
              height: 2px;
              left:0;
              bottom: -1px;
              background-color: red;
          }
</style>
