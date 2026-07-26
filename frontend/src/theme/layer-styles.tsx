/**
 * 第 3 层:盒子套餐(Layer Styles)
 * ------------------------------------------------------------------
 * CSS 稿中反复出现的"表面组合"(背景 + 描边 + 圆角 + 阴影/模糊)。
 * 用法:<Box layerStyle="surface.card" />
 */
import {defineLayerStyles} from "@chakra-ui/react";

export const layerStyles = defineLayerStyles({
    surface: {
        // 白色卡片:background #FFF + radius 16px(稿中主卡片)
        card: {
            description: "白色圆角卡片",
            value: {
                background: "bg",
                borderRadius: "xl",
            },
        },
        // 卡片 + 描边 + 投影(列表/表格容器)
        cardOutlined: {
            description: "白卡 + 1px #F0F0F0 描边 + 柔投影",
            value: {
                background: "bg",
                borderWidth: "thin",
                borderStyle: "solid",
                borderColor: "border",
                borderRadius: "xl",
                boxShadow: "card",
            },
        },
        // 弹层:白底 + radius 12px + popover 阴影
        popover: {
            description: "下拉/弹出层",
            value: {
                background: "bg",
                borderRadius: "lg",
                boxShadow: "popover",
            },
        },
        // 模态容器:radius 16px + drop-shadow(0 4px 4px rgba(0,0,0,.25))
        modal: {
            description: "居中模态卡(稿首 Frame 2147224270)",
            value: {
                background: "bg",
                borderRadius: "xl",
                filter: "dropModal",
            },
        },
        // 侧边栏:白底 + 右描边 + backdrop blur 42px
        sidebar: {
            description: "Sidebar:240px 白底,右侧 1px #F0F0F0,毛玻璃 42px",
            value: {
                background: "bg",
                borderRightWidth: "thin",
                borderRightStyle: "solid",
                borderRightColor: "border",
                backdropFilter: "blur({blurs.sidebar})",
                zIndex: "raised",
            },
        },
        topbar: {
            description: "Topbar:白底,底部 1px #F0F0F0,毛玻璃 42px",
            value: {
                background: "bg",
                borderBottomWidth: "thin",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
                backdropFilter: "blur({blurs.sidebar})",
                zIndex: "raised",
            },
        },
        // 强毛玻璃面板(blur 62px)
        glass: {
            description: "毛玻璃面板(backdrop-filter: blur(62px))",
            value: {
                backdropFilter: "blur({blurs.glass})",
            },
        },
        // 浅灰输入区表面(#F7F8FB + 底部分隔线)
        inputBar: {
            description: "浅灰输入条:bg #F7F8FB + border-bottom 1px #F0F0F0",
            value: {
                background: "bg.subtle",
                borderBottomWidth: "thin",
                borderBottomStyle: "solid",
                borderBottomColor: "border",
            },
        },
        // 表格单元格边:border-width 1px 0px 1px 1px(稿中表格)
        tableCell: {
            description: "表格格线:上/下/左 1px,右 0",
            value: {
                borderColor: "border",
                borderStyle: "solid",
                borderWidth: "1px 0px 1px 1px",
            },
        },
        // 顶部圆角柱(图表柱状,radius 8px 8px 0 0,紫 30% 底)
        chartBar: {
            description: "柱状图柱体:紫 30% 底 + 顶部圆角",
            value: {
                background: "bg.brandMuted",
                borderRadius: "8px 8px 0px 0px",
            },
        },
        // 虚线占位框(1px dashed #E2E8F0)
        dashed: {
            description: "虚线占位/上传框",
            value: {
                borderWidth: "thin",
                borderStyle: "dashed",
                borderColor: "border.dashed",
            },
        },
    },

    // 头像/圆形元素描边组合(稿中出现的全部描边样式)
    ring: {
        onDark: {
            description: "2px 白描边(头像叠放)",
            value: {borderWidth: "thick", borderStyle: "solid", borderColor: "border.onDark"},
        },
        brand: {
            description: "2px 品牌紫描边",
            value: {borderWidth: "thick", borderStyle: "solid", borderColor: "border.brand"},
        },
        success: {
            description: "2px 柔绿描边 #78CF6F",
            value: {borderWidth: "thick", borderStyle: "solid", borderColor: "border.success"},
        },
        strong: {
            description: "1.5px 深描边 #0D0D0D(插画/头像)",
            value: {borderWidth: "1.5", borderStyle: "solid", borderColor: "border.strong"},
        },
        navy: {
            description: "1.5px 藏青描边 #0F1A2A",
            value: {borderWidth: "1.5", borderStyle: "solid", borderColor: "border.strongNavy"},
        },
        black: {
            description: "1.5px 纯黑描边",
            value: {borderWidth: "1.5", borderStyle: "solid", borderColor: "border.black"},
        },
        blackThin: {
            description: "1.2px 纯黑描边(插画线条)",
            value: {borderWidth: "1.2", borderStyle: "solid", borderColor: "border.black"},
        },
        halfBlack: {
            description: "1.5px 半透明黑描边 rgba(0,0,0,.5)",
            value: {borderWidth: "1.5", borderStyle: "solid", borderColor: "border.halfBlack"},
        },
        gray: {
            description: "1.5px 灰描边 #808080",
            value: {borderWidth: "1.5", borderStyle: "solid", borderColor: "border.mutedGray"},
        },
        icon: {
            description: "1.66667px 图标描边 #667085(Gray/500)",
            value: {borderWidth: "1.67", borderStyle: "solid", borderColor: "border.icon"},
        },
    },
});
