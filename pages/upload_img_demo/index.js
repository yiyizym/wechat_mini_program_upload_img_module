//index.js
//获取应用实例

const ImageUploader = require('../common/image_uploader/image_uploader.js');

Page({
  data: {
    imageUploadData: ImageUploader.mergeData({
      imageUploadTitle: '定制标题'
    })
  },
  onLoad: function(){
    new ImageUploader(this);
  }
});
