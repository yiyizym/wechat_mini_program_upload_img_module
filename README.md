## 小程序上传图片示例组件

这是一个上传图片示例组件，目的在于展示如何在小程序中编写组件，**请不要一点代码都不改直接拿来用于生产环境哦**。

组件的关键设计思路，请看[这篇文章](https://judes.me/tech/2017/02/11/wechat_app.html)

## 使用方法和注意事项

- 因为本组件有大量 ES6 语法，请先勾选小程序开发工具中的“开启 ES6 转 ES5 ”选项
- 先在页面的 wxml 文件中引入本组件模板，下面的代码引入了两个组件。 `img1` 与 `img2` 分别是两个组件的 `key` ，请确保同一个页面中不同组件的 `key` 不一样 ：
```
<!--index.wxml-->
<import src="../common/image_uploader/image_uploader.wxml" />
<view class="container">
  <template is="image_uploader" data="{{...img1}}" />
  <template is="image_uploader" data="{{...img2}}" />
</view>
```

- 然后在页面的 js 文件中，先引入组件的类，定制各个组件的初始数据，最后实例化各个组件，与上面的代码对应的写法如下：
```
//index.js
const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    img1: ImageUploader.mergeData({
      imageUploadTitle: '定制标题1',//组件的标题

      sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
      sizeType: ['compressed'],//上传前是否压缩，默认压缩
      maxCount: 1,//一次选择图片的数量
      //以上三个配置项详情请看小程序文档
      
      uploadedImagesPaths: [],//用数组保存已上传的图片路径，也可以设置初始时就显示的图片
      uploadParams: {
          url: '',//后台接收上传图片的路径
          name: 'file',//后台依靠这个字段拿到文件对象
          formData: {}//这个字段可以设置传到后台的额外的参数
          //以上三个配置项详情请看小程序文档
      }
    }),
    img2: ImageUploader.mergeData({
      imageUploadTitle: '定制标题2'
    })
  },
  onLoad: function(){
    new ImageUploader(this, 'img1');//第一个参数必须是 this ，指向 page 实例；第二个参数是组件的 key
    new ImageUploader(this, 'img2');
  }
});
```
## licence
MIT
