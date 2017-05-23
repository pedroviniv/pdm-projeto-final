/*global cordova, module*/

module.exports = {
    share: function (photoUrl, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "SocialSharing", "photoSharing", [photoUrl]);
    }
};
