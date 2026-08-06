// ios/App/App/DeviceShake.swift —— 整个 iOS 端就这一个文件

import UIKit
import Capacitor
import CoreMotion

// MARK: - 插件本体(你贴的部分,原样)

@objc(DeviceShakePlugin)
public class DeviceShakePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "DeviceShakePlugin"
    public let jsName = "DeviceShake"          // ← 必须等于 JS 侧 registerPlugin('DeviceShake')
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "enableListening", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopListening", returnType: CAPPluginReturnPromise)
    ]

    private let motion = CMMotionManager()
    private var listening = false
    private var lastShake: TimeInterval = 0
    private let thresholdG = 2.7
    private let cooldown: TimeInterval = 1.0

    override public func load() {
        NotificationCenter.default.addObserver(
            forName: Notification.Name("DeviceShakeSimulated"), object: nil, queue: .main
        ) { [weak self] _ in
            guard let self, self.listening else { return }
            self.notifyListeners("shake", data: [:])
        }
    }

    @objc func enableListening(_ call: CAPPluginCall) {
        listening = true
        guard motion.isAccelerometerAvailable else {
            call.resolve()      // 模拟器没有加速度计,只靠后门
            return
        }
        motion.accelerometerUpdateInterval = 1.0 / 30.0
        motion.startAccelerometerUpdates(to: .main) { [weak self] data, _ in
            guard let self, let a = data?.acceleration else { return }
            let g = sqrt(a.x * a.x + a.y * a.y + a.z * a.z)
            let now = Date().timeIntervalSince1970
            if g > self.thresholdG, now - self.lastShake > self.cooldown {
                self.lastShake = now
                self.notifyListeners("shake", data: [:])
            }
        }
        call.resolve()
    }

    @objc func stopListening(_ call: CAPPluginCall) {
        listening = false
        motion.stopAccelerometerUpdates()
        call.resolve()
    }
}

// MARK: - 桥 VC:注册插件 + 模拟器摇一摇后门

class MyViewController: CAPBridgeViewController {

    // Capacitor 初始化完成的钩子,本地插件在这里登记
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(DeviceShakePlugin())
    }

    // 保证本 VC 能收到 UIKit 摇一摇手势
    override var canBecomeFirstResponder: Bool { true }
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        becomeFirstResponder()
    }

    // 模拟器菜单 Device ▸ Shake 触发的是这里(UIKit 手势),不是加速度计
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        #if targetEnvironment(simulator)
        if motion == .motionShake {
            NotificationCenter.default.post(name: Notification.Name("DeviceShakeSimulated"), object: nil)
        }
        #endif
        super.motionEnded(motion, with: event)
    }
}
