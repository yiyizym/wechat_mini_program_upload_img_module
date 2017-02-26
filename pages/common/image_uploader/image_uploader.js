'use strict';
const Promise = require('../../../utils/bluebird.js');
const wechat = require('../../../utils/wechat.js');
const util = require('../../../utils/util.js');

const defaultData = {
    chooseImage: 'chooseImage',
    previewImage: 'previewImage',
    setChooseImageCallback: 'setChooseImageCallback',
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
    // 请确保 key 是唯一的，否则同一个页面内多个实例的数据和方法会互相覆盖
    constructor(pageContext, key = ''){
        let that = this;
        this.key = key;
        this.page = pageContext;
        this.data = this.page.data[key];

        this.data['chooseImage'] = this.data.chooseImage + key;
        this.data['previewImage'] = this.data.previewImage + key;
        this.data['setChooseImageCallback'] = this.data.setChooseImageCallback + key;
        this.page.setData({
            [key]: this.data
        })

        this.page[this.data.chooseImage] = this.chooseImage.bind(this);
        this.page[this.data.previewImage] = this.previewImage.bind(this);
        this.page[this.data.setChooseImageCallback] = this.setChooseImageCallback.bind(this);
        
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
            this.data.uploadedImagesPaths.push(filePath);
            this.page.setData({
                [this.key]: this.data
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

