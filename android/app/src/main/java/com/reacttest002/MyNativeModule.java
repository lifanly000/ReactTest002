package com.reacttest002;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by lifan on 2017/6/28.
 */

public class MyNativeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext;

    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyNativeModule";
    }

    @ReactMethod
    public void rnCallNative(String msg){
        Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(mContext,MyBottomActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);

    }

    public void sendMsgToRn(String msg){
        //将消息msg发送给RN侧
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage",msg);
    }
}
