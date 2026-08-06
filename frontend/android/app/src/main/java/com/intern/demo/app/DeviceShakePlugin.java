package com.intern.demo.app;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.os.Bundle;
import android.util.Log;

@CapacitorPlugin(name = "DeviceShake")
public class DeviceShakePlugin extends Plugin implements SensorEventListener {

    private SensorManager sensorManager;
    private static final float THRESHOLD_G = 2.7f;
    private static final long COOLDOWN_MS = 1000;
    private long lastShake = 0;

    @PluginMethod
    public void enableListening(PluginCall call) {
        if (sensorManager == null)
            sensorManager = (SensorManager) getContext().getSystemService(Context.SENSOR_SERVICE);
        Sensor accel = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if (accel == null) { call.reject("No accelerometer on this device"); return; }
        sensorManager.registerListener(this, accel, SensorManager.SENSOR_DELAY_UI);
        call.resolve();
    }

    @PluginMethod
    public void stopListening(PluginCall call) {
        if (sensorManager != null) sensorManager.unregisterListener(this);
        call.resolve();
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        float x = event.values[0], y = event.values[1], z = event.values[2];
        double g = Math.sqrt(x * x + y * y + z * z) / SensorManager.GRAVITY_EARTH;
        long now = System.currentTimeMillis();
        if (g > THRESHOLD_G && now - lastShake > COOLDOWN_MS) {
            lastShake = now;
            notifyListeners("shake", new JSObject());
        }
    }

    @Override public void onAccuracyChanged(Sensor sensor, int accuracy) {}

    @Override
    protected void handleOnDestroy() {
        if (sensorManager != null) sensorManager.unregisterListener(this);
    }
}