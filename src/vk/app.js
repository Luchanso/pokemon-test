if (isVkEnv()) {
  VK.init(function() {
    /**
     * Успешное иницирование VK API
     * @type {Boolean}
     */
    VK.succesInit = true;
    VK.publicatePhoto();
  }, function() {
    VK.succesInit = false;
  }, '5.53');
}

VK.publicatePhoto = function(image) {
  getWallUploadServer()
    .then(function(url) {
    });
}

function getWallUploadServer() {
  return new Promise(function(res, rej) {
    VK.api("photos.getWallUploadServer", {"test_mode": 1}, function (data) {
      if (data.response) {
        res(data.response.upload_url);
      }
      else {
        rej(data);
      }
    });
  });
}

function uploadData(data, url) {
  var boundary = '----------Ij5ae0ae0KM7GI3KM7';
  var imageName = 'image.png';

  var bin = boundary + '\r\nContent-Disposition: form-data; name="file1"; filename="image.png"';
  bin += "\r\nContent-Type: image/png\r\n\r\n"
  bin += data;
  bin += "\r\n--" + boundary + '--\r\n';

  var byteArray = strToArrayBuffer(bin);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
  xhr.send(byteArray);
}

function strToArrayBuffer(str) {
  var buf = new ArrayBuffer(str.length * 2);
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function isVkEnv() {
  return (location.ancestorOrigins.length !== 0 && location.ancestorOrigins[0].indexOf('vk') !== -1);
}
