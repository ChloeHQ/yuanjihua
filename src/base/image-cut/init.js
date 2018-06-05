let sPoint = {},
    ePoint = {};
let ctx = {}
let preview = new Image();


// let canvas = null
export function InitCanvas(canvas, imageWidth){
  document.test.file.addEventListener('change', function() {
    var fr = new FileReader();
    fr.readAsDataURL(this.files[0]);
    fr.onload = function() {
      // console.log(this.result)
      var ret = loadImage(this.result)
      ret.then(preview =>  {
        let p_w = preview.width
        let p_h = preview.height
        //缩放
        let aspect = imageWidth/p_w
        aspect = aspect.toFixed(2)
        preview.width = imageWidth
        preview.height = p_h * aspect

        canvas.width = preview.width;
        canvas.height = preview.height;
        ctx = canvas.getContext('2d');
      }).then(function(){
        drawImage()
      })
    }
  })

  function loadImage(result){
    const promise = new Promise((resolve, reject) => {
      preview.onload = function(){
        resolve(preview)
      }
      preview.onerror = function(){
        reject()
      }
      preview.src= result;
    })
    return promise
  }

  canvas.addEventListener('mousedown', function(e) {
  //鼠标左键被按下
    if(clip.disabled){
      e.preventDefault();
      return;
    }
    if(e.button === 0) {
      sPoint.x = e.offsetX;
      sPoint.y = e.offsetY;
      sPoint.drag = true;
    }
  })

  canvas.addEventListener('mousemove', function(e) {
    if(e.button === 0 && sPoint.drag) {
      var nPoint = {
        x: e.offsetX,
        y: e.offsetY
      };
      ctx.save();    //clip要通过restore恢复
      ctx.clearRect(0, 0, canvas.width, canvas.height);    //画布全清
      drawImage();    //绘制底图
      drawCover();    //绘制阴影
      ctx.beginPath();    //开始路径
      ctx.rect(sPoint.x, sPoint.y, nPoint.x - sPoint.x, nPoint.y - sPoint.y);    //设置路径为选取框
      ctx.strokeStyle = 'rgb(200, 21,21)'
      ctx.lineWidth = 3;
      ctx.stroke();
      // ctx.arc(100, 100, 75, 0, Math.PI*2, false);
      ctx.clip();    //截取路径内为新的作用区域
      drawImage();    //在选取框内绘制底图
      ctx.restore();    //恢复clip截取的作用范围
    }
  });

  function drawImage(){
    ctx.drawImage(preview, 0, 0,canvas.width, canvas.height); 
  }
//添加松开鼠标的事件监听，松开左键为拖动结束，松开右键为复原
  canvas.addEventListener('mouseup', function(e) {
    if(e.button === 0) {
      sPoint.drag = false;
      ePoint.x = e.offsetX;
      ePoint.y = e.offsetY;
    }else if(e.button === 2) {
      if(clip.disabled !== true){
        restore();
        console.log(clip.disabled)
      }
    }
  });

  //绘制阴影的的方法，并且在鼠标按下去移动的时候不停的绘制
  function drawCover() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
  });

  let clip = document.querySelector('#clip');
  clip.addEventListener('click', function(e) {
    e.preventDefault();    //阻止默认事件，不然会触发form的submit
    if(sPoint.x !== undefined && ePoint.x !== undefined) {
    //把裁剪区域的图片信息提取出来
      var imgData = ctx.getImageData(sPoint.x, sPoint.y, ePoint.x - sPoint.x, ePoint.y - sPoint.y);    
      ctx.clearRect(0, 0, canvas.width, canvas.height);    //清空画布
      canvas.width = Math.abs(ePoint.x - sPoint.x);    //重置canvas的大小为新图的大小
      canvas.height = Math.abs(ePoint.y - sPoint.y);
      ctx.putImageData(imgData, 0, 0);    //把提取出来的图片信息放进canvas中
      preview.src = canvas.toDataURL();    //裁剪后我们用新图替换底图，方便继续处理
      clip.disabled = true
    }else {
      alert('没有选择区域');
    }
  }); 


  function restore() {
    sPoint = {};
    ePoint = {};
    drawImage();
  }
  //改变灰度
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








