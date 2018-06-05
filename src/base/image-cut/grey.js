export function InitGrey(canvas, ctx){
  console.log(canvas)
  var grey = document.querySelector('#grey');
  grey.addEventListener('click', function(e) {
    e.preventDefault();
    var startX = 0, startY = 0, width = canvas.width, height = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);    //一如既往的先清空画布，不然会处理含有选取框的图片内容
    drawImage();    //绘制底图
    var imgData = ctx.getImageData(startX, startY, width, height);   //把整个底图的图片内容取出来 
    for(var i = 0; i < imgData.data.length;) {
      var red = imgData.data[i],
          green = imgData.data[i+1],
          blue = imgData.data[i+2],
          opacity = imgData.data[i+3],    //不处理，可以省去这一行，占位说明这一位是透明度
          average = (red + green + blue) / 3;    //所谓灰度其实是取三种颜色的平均值
      imgData.data[i] = imgData.data[i+1] = imgData.data[i+2] = average;    //三个颜色设为一样即是对应的灰色
      i += 4;
    }
    ctx.putImageData(imgData, startX, startY, 0, 0, width, height);    //把处理过的imagedata放回canvas中
    preview.src = canvas.toDataURL();    //保存图片信息方便再进行处理
  });
}