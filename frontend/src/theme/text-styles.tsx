/**
 * 第 3 层:文字套餐(Text Styles)
 * ------------------------------------------------------------------
 * 覆盖 CSS 稿中出现的**全部 25 种**字体组合:
 * - 3 个 Figma 命名样式:Display/XXSmall、Heading/XSmall、Label/Medium
 * - 22 种 Inter 正文组合(按 字号 × 字重 × 行高 归并)
 * 颜色不写死在文字套餐里(用 semantic fg.* 搭配),
 * 但 CSS 中"该样式默认配哪种颜色"已在注释中标明。
 * 用法:<Text textStyle="body.sm.medium" color="fg.emphasis" />
 */
import {defineTextStyles} from "@chakra-ui/react";

export const textStyles = defineTextStyles({
    // ================= Plus Jakarta Sans(Figma 命名样式)=================

    heading: {
        small: {
            description: "Figma: Heading/XSmall — 卡片/区块小标题",
            value: {
                fontFamily: "heading",
                fontWeight: "semibold", // 600
                fontSize: "sm", // 14px
                lineHeight: "20", // 20px
                letterSpacing: "wide", // 0.01em
                // 稿中默认色:fg (=#0D0D0D)
            },
        },
        medium: {
            description: "Figma: Label/Medium — 副标题/说明文字",
            value: {
                fontFamily: "heading",
                fontWeight: "medium", // 500
                fontSize: "md", // 16px
                lineHeight: "24", // 24px
                letterSpacing: "wide", // 0.01em
                // 稿中默认色:fg.placeholder (=#808080)
            },
        },
        large: {
            description: "Figma: Display/XXSmall — 页面大标题(Welcome)",
            value: {
                fontFamily: "heading",
                fontWeight: "semibold", // 600
                fontSize: "2xl", // 24px
                lineHeight: "32", // 32px
                letterSpacing: "tight", // -0.01em
                // 稿中默认色:fg (=#0D0D0D)
            },
        },
    },


    // ================= Inter 正文体系 =================
    body: {
        // ---------- 10px ----------
        "xxs.medium.relaxed.normal": {
            description: "Inter 500 10px/160%",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "xxs",
                lineHeight: "relaxed",
                fontFeatureSettings: "normal",
            },
        },

        // ---------- 12px ----------
        xs: {
            description: "Inter 400 12px/150% — 辅助小字(稿中配 #808080 或 80% 白)",
            value: {fontWeight: "regular", fontFamily: "body", fontSize: "xs", lineHeight: "normal"},
        },
        "xs.tight": {
            description: "Inter 400 12px/130% — 紧凑小字(稿中配 #808080,'salt' on)",
            value: {
                fontFamily: "body",
                fontWeight: "normal",
                fontSize: "xs",
                lineHeight: "tight",
                fontFeatureSettings: "'salt' on",
            },
        },
        "xs.medium": {
            description: "Inter 500 12px/150% — 小字强调(稿中配 #34AF25,'salt' on)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "xs",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },
        "xs.medium.relaxed.normal": {
            description: "Inter 500 12px/160%",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "xs",
                lineHeight: "relaxed",
                fontFeatureSettings: "normal",
            },
        },
        "xs.regular.relaxed.normal": {
            description: "Inter 500 12px/160%",
            value: {
                fontFamily: "body",
                fontWeight: "regular",
                fontSize: "xs",
                lineHeight: "relaxed",
                fontFeatureSettings: "normal",
            },
        },


        "xs.table": {
            description: "Inter 500 12px/20px — 表格辅助列(稿中配 #94A3B8 / #0F1A2A)",
            value: {fontFamily: "body", fontWeight: "medium", fontSize: "xs", lineHeight: "20"},
        },


        // ---------- 14px ----------
        sm: {
            description: "Inter 400 14px/160% — 常规正文(稿中配 #64748B)",
            value: {fontFamily: "body", fontWeight: "semibold", fontSize: "sm", lineHeight: "20"},
        },
        "sm.footer": {
            description: "Login/Signup footer",
            value: {fontFamily: "heading", fontWeight: "semibold", fontSize: "sm", lineHeight: "normal"},
        },
        "sm.salt": {
            description: "Inter 400 14px/150% — 正文变体('salt' on,稿中配 #808080)",
            value: {
                fontFamily: "body",
                fontWeight: "normal",
                fontSize: "sm",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },
        "sm.regular": {
            description: "Inter 400 14px/150% — 正文变体('salt' on,稿中配 #808080)",
            value: {
                fontFamily: "body",
                fontWeight: "regular",
                fontSize: "sm",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },
        "sm.regular.relaxed": {
            description:
                "Inter 500 14px/160% — 正文强调(稿中配 #0F1A2A/#000/#0D0D0D/#161819,部分 'salt' on)",
            value: {fontFamily: "body", fontWeight: "regular", fontSize: "sm", lineHeight: "relaxed",},
        },
        "sm.medium": {
            description:
                "Inter 500 14px/160% — 正文强调(稿中配 #0F1A2A/#000/#0D0D0D/#161819,部分 'salt' on)",
            value: {fontFamily: "body", fontWeight: "medium", fontSize: "sm", lineHeight: "relaxed",},
        },
        "sm.medium.normal": {
            description:
                "Inter 500 14px/160% — 正文强调(稿中配 #0F1A2A/#000/#0D0D0D/#161819,部分 'salt' on)",
            value: {fontFamily: "body", fontWeight: "medium", fontSize: "sm", lineHeight: "relaxed", fontFeatureSettings: "normal"},
        },
        "sm.medium.salt": {
            description: "Inter 500 14px/150% + 'salt' on — 按钮/菜单文字(稿中配 #0D0D0D/#FFF/#808080)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "sm",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },
        "sm.semibold": {
            description: "Inter 600 14px/160% — 状态文字(稿中配 #30CB22/#F96B6B/#8C7BF7)",
            value: {fontFamily: "body", fontWeight: "semibold", fontSize: "sm", lineHeight: "relaxed"},
        },

        // ---------- 16 / 18 / 24 px(Inter 500 150% 'salt' on 系列)----------
        "md.medium.salt": {
            description: "Inter 500 16px/150% + 'salt' on(稿中配 #0D0D0D)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "md",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },

        "md.semibold.relaxed.salt": {
            description: "Inter 600 16px/160%",
            value: {
                fontFamily: "body",
                fontWeight: "semibold",
                fontSize: "md",
                lineHeight: "relaxed",
                fontFeatureSettings: "'salt' on",
            },
        },
        "md.medium.relaxed.normal": {
            description: "Inter 600 16px/160%",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "md",
                lineHeight: "relaxed",
                fontFeatureSettings: "normal",
            },
        },

        "lg.medium.salt": {
            description: "Inter 500 18px/150% + 'salt' on(稿中配 #0D0D0D)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "lg",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },

        "lg.medium.relaxed.salt": {
            description: "Inter 500 18px/160% + 'salt' on(稿中配 #0D0D0D)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "lg",
                lineHeight: "relaxed",
                fontFeatureSettings: "'salt' on",
            },
        },

        "2xl.medium.salt": {
            description: "Inter 500 24px/150% + 'salt' on — 数据大数字(稿中配 #0D0D0D)",
            value: {
                fontFamily: "body",
                fontWeight: "medium",
                fontSize: "2xl",
                lineHeight: "normal",
                fontFeatureSettings: "'salt' on",
            },
        },


    },

});
