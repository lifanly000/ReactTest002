package com.reacttest002.viewmanager;

import android.graphics.Color;
import android.text.TextUtils;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reacttest002.view.FocusedTextView;

import static android.R.attr.name;

/**
 * Created by lifan on 2017/6/28.
 */

public class FocusedTextViewManager extends SimpleViewManager<FocusedTextView> {

    private ThemedReactContext mContext;

    @Override
    public String getName() {
        return "FocusedTextView";
    }

    @Override
    protected FocusedTextView createViewInstance(ThemedReactContext reactContext) {
        mContext = reactContext;
        FocusedTextView focusedTextView = new FocusedTextView(mContext);
        focusedTextView.setText("RN---欢迎加入React Native VIP，学习更好更给力的app开发技术【跨平台的移动开发技术】啦啦啦啦啦啦啦啦啦啦......");
        focusedTextView.setTextColor(Color.BLUE);
        focusedTextView.setSingleLine(true);
        focusedTextView.setTextSize(20);
        focusedTextView.setEllipsize(TextUtils.TruncateAt.MARQUEE);
        return focusedTextView;
    }
    @ReactProp(name = "text")
    public void setText(FocusedTextView view,String text){
        view.setText(text);
    }
}
