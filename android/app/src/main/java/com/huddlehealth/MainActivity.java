package com.huddlehealth;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;

import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Huddle";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Intent intent = getIntent();
    String type = intent.getType();
    String action = intent.getAction();

    boolean showSplash = true;

    // Problem: I don't really know technically what's happening....
    // If Huddle is chosen from the sharesheet of google docs/sheets (and only
    // these two apps as far as I can tell...) it will open Huddle **inside**
    // that app, and will (for some reason) call onCreate. It will leave
    // the existing Huddle instance running too, but will hijack the JS process.

    // Solution: If we are coming from google sheets, dont show the
    // splash screen, otherwise Huddle will be stuck on the splash screen.
    // Since the JS process is not re-started, the app is already mounted, and
    // the logic we have in JS to hide the splash screen (in Onboarding.js) is not
    // shown.

    // tldr; This is gross, but I couldn't make it work any other way.
    if (Intent.ACTION_SEND.equals(action) && type != null) {
      Uri imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);

      if (imageUri.toString().matches("(.*)com.google.android.apps.docs.editors(.*)")) {
        showSplash = false;
      }
    }

    if (showSplash) {
      SplashScreen.show(this, R.style.SplashTheme);

    }

    handleSendData(intent);

    super.onCreate(savedInstanceState);
  }

  @Override
  public void onNewIntent(final Intent intent) {
    handleSendData(intent);
    super.onNewIntent(intent);
  }

  // This code was copied from StackOverflow
  // The url that android gives us does not contain the file name, it is really
  // wierd. This will function will lookup the correct file name
  public String getFileName(Uri uri) {
    String result = null;
    if (uri.getScheme().equals("content")) {
      Cursor cursor = getContentResolver().query(uri, null, null, null, null);
      try {
        if (cursor != null && cursor.moveToFirst()) {
          result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
        }
      } finally {
        cursor.close();
      }
    }
    if (result == null) {
      result = uri.getPath();
      int cut = result.lastIndexOf('/');
      if (cut != -1) {
        result = result.substring(cut + 1);
      }
    }

    return result;
  }

  void handleSendData(Intent intent) {
    String action = intent.getAction();
    String type = intent.getType();

    // ACTION_SEND is the intent type when you click "open in Huddle" from a
    // different
    // app's ShareSheet
    if (Intent.ACTION_SEND.equals(action) && type != null) {
      // List the MIME types that we want to handle here
      if (type != null) {
        Uri imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
        String name = getFileName(imageUri);

        // We will add two query params to the uri that the JS will access
        Uri.Builder builder = imageUri.buildUpon();
        // Add the filename so we know what to call our file and so we have the
        // extension
        builder.appendQueryParameter("originalFileName", name);
        // Add the originalUrl so we can upload the raw file
        builder.appendQueryParameter("originalUrl", imageUri.toString());

        if (imageUri != null) {
          String foo = builder.build().toString();
          intent.setData(builder.build());
          intent.setAction(Intent.ACTION_VIEW);
        }
      }
    }
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
