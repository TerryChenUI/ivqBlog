module.exports = {
    "imageActionName": "uploadimage",
    "imageFieldName": "upfile",
    "imageMaxSize": 2048000,
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
    "imageCompressEnable": true,
    "imageCompressBorder": 1600,
    "imageInsertAlign": "none",
    "imageUrlPrefix": "",
    "imagePathFormat": "/ui/assets/upload/ue/images/{yyyy}{mm}{dd}/{time}{rand:6}",

    "fileActionName": "uploadfile",
    "fileFieldName": "upfile",
    "filePathFormat": "/ui/assets/upload/ue/files/{yyyy}{mm}{dd}/{time}{rand:6}",
    "fileUrlPrefix": "",
    "fileMaxSize": 51200000,
    "fileAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ],

    "imageManagerActionName": "listimage",
    "imageManagerListPath": "/ui/assets/upload/ue/images/",
    "imageManagerListSize": 20,
    "imageManagerUrlPrefix": "",
    "imageManagerInsertAlign": "none",
    "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],


    "fileManagerActionName": "listfile",
    "fileManagerListPath": "/ui/assets/upload/ue/file/",
    "fileManagerUrlPrefix": "",
    "fileManagerListSize": 20,
    "fileManagerAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ]
};