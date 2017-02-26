//index.js
//获取应用实例

const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    img1: ImageUploader.mergeData({
      imageUploadTitle: '定制标题1',

      sourceType: ['camera', 'album'], //上传图片的来源，相机/相册
      sizeType: ['compressed'],//上传前是否压缩，默认压缩
      maxCount: 1,//一次选择图片的数量
      //以上三个配置项详情请看小程序文档
      
      uploadedImagesPaths: [],//保存已上传的图片路径，也可以设置初始时就显示的图片
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
    new ImageUploader(this, 'img1');
    new ImageUploader(this, 'img2');
  }
});
