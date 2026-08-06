package com.intern.demo.app;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(DeviceShakePlugin.class);   // 必须在 super 之前
        super.onCreate(savedInstanceState);
    }
}
