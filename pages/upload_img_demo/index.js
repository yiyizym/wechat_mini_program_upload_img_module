//index.js
//获取应用实例

const ImageUploader = require('../common/image_uploader/image_uploader.js');
Page({
  data: {
    img1: ImageUploader.mergeData({
      imageUploadTitle: '定制标题1'
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
