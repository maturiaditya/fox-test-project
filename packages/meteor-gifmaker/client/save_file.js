Meteor.saveFile = function(blob, name, id, path, type, callback) {
    var fileReader = new FileReader(),
        method, encoding = 'binary', type = type || 'binary';
    switch (type) {
        case 'image/png':
        case 'image/jpeg':
        case 'base64':
            method = 'readAsDataURL';
            encoding = 'base64';
            break;
        default:
            method = 'readAsDataURL';
            encoding = 'base64';
            break;
    }
    fileReader.onload = function(file) {
       //console.log(file);
       //images[id]=file;
    }
    
    fileReader.onloadend = function(){
        //console.log(fileReader.result);
        images[id]=fileReader.result;
    };
    
    fileReader[method](blob);
}