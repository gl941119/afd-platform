const url = {
    // localTestUrl: 'http://192.168.1.119:8091/',
    localTestUrl: 'http://192.168.1.254:8091/',
    // localTestUrl: 'http://192.168.1.15:8091/',
    productUrl: 'http://192.168.1.254:8091/',
    // productUrl: 'http://api.afdchain.com/',
};

export default {
    url,
    pageSize: 10, // 一页的数量
    pageStart: 1,
    TelegramBot: 'AFDchain_bot',
    headPortrait: [
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/8b8b249f7cd14a219b046e04d95f9949.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/5429df2d58ff41de90cf53c5cfaec9e8.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/0ce0fa3b61824c05a3b797adc921150b.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/93d1430facea4666b9f8ed6d7b492f85.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/160e46c1a97e46a4a6fda3a472404e3f.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/01eae45e07fe48658baa24c50c3e5578.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/ef7e7dc8ccda4052949ecebf7e3ad5a5.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/1df3a84084224c608dc6c1a153ac5f67.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/7f986174b62c46fea45212e5ae6ea70a.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/37610c9bac064549b7052f9e71c1203e.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/e84ec7c981ad4ebba9f5e7811bd6a04f.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/ee0c2acf10bd40faa232ee34c0a99421.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/013142a4f3f84e52bb518bc339bea20f.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/d58c936b9e3c4291bc13c452021ec17b.png",
        "https://s3-us-west-2.amazonaws.com/static-afd/upload-folder/picture/57dc9b4a9a974552957f2ac654f011f8.png"
    ],
    UploadImg: (process.env.NODE_ENV === 'development' ? url.localTestUrl : url.productUrl) + 'blockchainadvert/common/upload-file',
    UploadAuthImg: (process.env.NODE_ENV === 'development' ? url.localTestUrl : url.productUrl) + 'blockchainadvert/common/uploadImageWithWatermark',
};
