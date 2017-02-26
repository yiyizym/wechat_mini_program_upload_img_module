'use strict';
const wechat = require('../../../utils/wechat.js');
const Promise = require('../../../utils/bluebird.js');
const util = require('../../../utils/util.js');

const defaultData = {
    imageUploadTitle: '上传图片',
    sourceType: ['camera', 'album'],
    sizeType: ['compressed'],
    maxCount: 1,
    uploadedImagesPaths: [],
    uploadParams: {
        url: '',
        name: 'file',
        formData: {}
    }
};

class ImageUploader {
    constructor(pageContext){
        let that = this;
        this.page = pageContext;
        this.data = this.page.data.imageUploadData;
        this.page.chooseImage = this.chooseImage.bind(this);
        this.page.previewImage = this.previewImage.bind(this);
        this.page.setChooseImageCallback = this.setChooseImageCallback.bind(this);
        
    }

    chooseImage() {
        let data = this.data;
        wechat.chooseImage(data.sourceType, data.sizeType, data.maxCount).then(res => {
            this._chooseImageCb(res);
        },e => {
            console.log(e);
        });
    }

    previewImage(e) {
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: this.data.uploadedImagesPaths
        });
    }

    setChooseImageCallback(cb){
        if(typeof cb == 'function'){
            this._chooseImageCb = cb;
        }
        else {
            throw 'setChooseImageCallback receives a "function" as argument';
        }
    }

    _chooseImageCb(res){
        let filePath = res.tempFilePaths[0];
        this._uploadImage(res).then(res => {
            this._addToUploadedPaths(res, filePath);
        }, e => {
            console.log(e);
        });
    }

    _uploadImage(res){
        let data = this.data;
        let filePath = res.tempFilePaths[0];
        let uploadParams = data.uploadParams;
        let formData = Object.assign({}, uploadParams['formData'], {});

        console.info('为了演示效果，直接 resolve true ，真实使用时，请删除 return Promise.resolve(true);'); 
        return Promise.resolve(true);

        return wechat.uploadFile(uploadParams['url'],filePath,uploadParams['name'], formData);
    }

    _addToUploadedPaths(resp, filePath){
        if (this._isUploadSuccess(resp)) {
            let current = this.data.uploadedImagesPaths;
            current.push(filePath);
            this.page.setData({
                'imageUploadData.uploadedImagesPaths': current
            });
        }
        else {
            console.error(resp);
        }
    }

    _isUploadSuccess(resp){
        console.info('为了演示效果，直接 return true ，真实使用时，请写自己的判断逻辑'); 
        return true;
    }

}

ImageUploader.mergeData = function(data){
    return util.mergeDeep({}, defaultData, data);
};

module.exports = ImageUploader;

