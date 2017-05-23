package io.github.kieckegard.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Intent;
import android.content.Context;

public class SocialSharing extends CordovaPlugin {

    private void sharePhoto(String photoUrl, Context context) {

        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_SEND);
        intent.setType("image/jpeg");
        intent.putExtra(Intent.EXTRA_TEXT, photoUrl);
        Intent chooser = Intent.createChooser(intent, "Compartilhar com...");
        chooser.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(chooser);
    }

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        Context context = this.cordova.getActivity().getApplicationContext(); 

        if (action.equals("photoSharing")) {

            String photoUrl = data.getString(0);
            sharePhoto(photoUrl, context);

            return true;

        } else {
            return false;

        }
    }
}
