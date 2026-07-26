/**
 * 第 1 层:词汇表(Primitive Tokens)
 * ------------------------------------------------------------------
 * CSS 稿(Figma 导出)中出现过的**每一个**原始值都收录在这里:
 * 颜色(全部 35 个 hex + 全部 13 个 rgba)、字体、字号、字重、行高、
 * 字距、圆角、阴影、模糊、间距、边框宽度、透明度、z-index。
 * 这一层只回答"有哪些值",不回答"用在哪"。
 */
import { defineTokens } from "@chakra-ui/react";

export const tokens = defineTokens({
  colors: {
    // ---------- 中性色(Figma: Neutral/* 、Gray/* 、Shade/*)----------
    neutral: {
      0: { value: "#FFFFFF" }, // Figma: Neutral/White、Shade/0
      10: { value: "#858585" }, // Figma: Neutral/50
      30: { value: "#F7F8FB" }, // Figma: Neutral/30(输入框浅底)
      50: { value: "#94A3B8" }, // Figma: Neutral/50
      60: { value: "#64748B" }, // Figma: Neutral/60(次级正文)
      100: { value: "#0F1A2A" }, // Figma: Neutral/100(深藏青文字)
      500: { value: "#808080" }, // Figma: Neutral/500(占位/弱文字)
      800: { value: "#0D0D0D" }, // Figma: Neutral/800(Main),主文字
      900: { value: "#161819" }, // 深灰正文变体
      1000: { value: "#000000" }, // 纯黑
    },
    gray: {
      100: { value: "#F0F0F0" }, // 通用描边/分隔线
      200: { value: "#E2E8F0" }, // 虚线边框(slate-200)
      500: { value: "#667085" }, // Figma: Gray/500(图标描边)
    },

    // ---------- 品牌紫 ----------
    purple: {
      100: { value: "#C9AEE8" }, // 浅紫装饰
      200: { value: "#9D9BF2" }, // 淡紫
      300: { value: "#8C7BF7" }, // 主品牌紫(强调文字/描边/图表)
      400: { value: "#9369BF" }, // 紫罗兰
      500: { value: "#906EB3" }, // 灰紫
      600: { value: "#624CF0" }, // 亮紫(图表/装饰块)
      800: { value: "#451B9F" }, // 深紫
    },

    // ---------- 绿色系(成功 / 主行动色)----------
    green: {
      50: { value: "#EAFBEB" }, // 极浅绿底
      100: { value: "#C9F8C1" }, // 按钮底色(_Button base)
      200: { value: "#B9DE96" }, // 灰绿装饰
      300: { value: "#AAFE5A" }, // 荧光绿
      400: { value: "#87DF36" }, // 亮绿
      500: { value: "#68CA0D" }, // 草绿
      600: { value: "#78CF6F" }, // 柔绿(描边/头像框)
      700: { value: "#30CB22" }, // Active 状态文字绿
      800: { value: "#34AF25" }, // 深成功绿(小字状态)
    },

    // ---------- 蓝色系 ----------
    blue: {
      50: { value: "#E8F2FF" }, // 浅蓝底
      100: { value: "#E6F6FF" }, // 冰蓝底
      300: { value: "#A5BCDB" }, // 雾蓝
      500: { value: "#698EC4" }, // 中蓝(图表/装饰)
    },

    // ---------- 橙色系 ----------
    orange: {
      300: { value: "#F4AE7E" }, // 浅橙
      400: { value: "#F19A5E" }, // 橙(图表/装饰)
    },

    // ---------- 红色系(错误/危险)----------
    red: {
      400: { value: "#F96B6B" }, // 错误文字红
      500: { value: "#DA3F51" }, // 错误文字红
    },

    // ---------- 透明色(CSS 中出现的全部 rgba)----------
    blackAlpha: {
      "3": { value: "rgba(0, 0, 0, 0.03)" }, // 按钮投影用
      "25": { value: "rgba(0, 0, 0, 0.25)" }, // drop-shadow 用
      "50": { value: "rgba(0, 0, 0, 0.5)" }, // 半黑描边
    },
    whiteAlpha: {
      "80": { value: "rgba(255, 255, 255, 0.8)" }, // 深底上的浅文字
    },
    purpleAlpha: {
      "10": { value: "rgba(140, 123, 247, 0.1)" }, // 紫色淡底(图形填充)
      "30": { value: "rgba(140, 123, 247, 0.3)" }, // 紫色淡底(柱状图/矩形)
    },
    greenAlpha: {
      "10": { value: "rgba(57, 223, 43, 0.1)" }, // Active 徽章底
      "10soft": { value: "rgba(85, 186, 73, 0.1)" }, // 柔和成功徽章底
    },
    redAlpha: {
      "10": { value: "rgba(249, 107, 107, 0.1)" }, // 错误徽章底
    },
    shadowInk: {
      // 仅在阴影中出现的墨色,收录以求完备
      "1828/5": { value: "rgba(16, 24, 40, 0.05)" },
      "1828/11": { value: "rgba(16, 24, 40, 0.11)" },
      "162b52/4": { value: "rgba(22, 43, 82, 0.04)" },
      "1e2033/5": { value: "rgba(30, 32, 51, 0.05)" },
    },
  },

  // ---------- 字体 ----------
  fonts: {
    heading: { value: "'Plus Jakarta Sans', sans-serif" },
    body: { value: "'Inter', sans-serif" },
  },
  fontSizes: {
    xxs: { value: "10px" },
    xs: { value: "12px" },
    sm: { value: "14px" },
    md: { value: "16px" },
    lg: { value: "18px" },
    "2xl": { value: "24px" },
  },
  fontWeights: {
    normal: { value: "400" },
    medium: { value: "500" },
    semibold: { value: "600" },
  },
  lineHeights: {
    // 百分比制(Inter 正文)
    tight: { value: "130%" },
    normal: { value: "150%" },
    relaxed: { value: "160%" },
    // 固定值制(Plus Jakarta Sans 标题 & 表格小字)
    "20": { value: "20px" },
    "24": { value: "24px" },
    "32": { value: "32px" },
  },
  letterSpacings: {
    tight: { value: "-0.01em" }, // Display/XXSmall
    normal: { value: "0" },
    wide: { value: "0.01em" }, // Heading/XSmall、Label/Medium
  },

  // ---------- 圆角(CSS 中出现的全部值)----------
  radii: {
    hairline: { value: "1px" },
    sm: { value: "6px" }, // Input
    md: { value: "8px" }, // Button
    "10": { value: "10px" },
    lg: { value: "12px" }, // Button/1 外框
    xl: { value: "16px" }, // 卡片
    pill: { value: "32px" }, // 状态徽章
    "2xl": { value: "40px" },
    full: { value: "80px" }, // 头像/大圆
  },

  // ---------- 阴影(CSS 中出现的全部 box-shadow / drop-shadow)----------
  shadows: {
    xs: { value: "0px 1px 2px rgba(16, 24, 40, 0.05)" }, // Figma: Shadow/xs
    button: { value: "0px 4px 6px -2px rgba(0, 0, 0, 0.03)" }, // Button/1
    card: { value: "0px 4px 9px rgba(22, 43, 82, 0.04)" },
    popover: { value: "0px 5px 7px rgba(16, 24, 40, 0.11)" },
    // 以下三个在 CSS 中以 filter: drop-shadow() 出现
    dropXs: { value: "drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05))" },
    dropSoft: { value: "drop-shadow(0px 4px 20px rgba(30, 32, 51, 0.05))" },
    dropModal: { value: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))" },
  },

  // ---------- 模糊(backdrop-filter)----------
  blurs: {
    sidebar: { value: "42px" },
    glass: { value: "62px" },
  },

  // ---------- 间距(CSS 中出现的全部 gap / padding 分量)----------
  spacing: {
    "0.5": { value: "2px" },
    "1.5": { value: "6px" },
    "2": { value: "8px" },
    "2.5": { value: "10px" },
    "3": { value: "12px" },
    "3.5": { value: "14px" },
    "4": { value: "16px" },
    "5": { value: "20px" },
    "6": { value: "24px" },
    "8": { value: "32px" },
    "9": { value: "36px" },
    "10": { value: "40px" },
    "12": { value: "48px" },
    "14": { value: "56px" },
    "20": { value: "79px" }, // 稿中特殊 gap: 79px
    "25": { value: "98px" }, // 稿中特殊 gap: 98px
    "58": { value: "232px" }, // padding: 16px 24px 24px 232px 的左缩进
  },

  // ---------- 边框宽度(CSS 中出现的全部值)----------
  borderWidths: {
    thin: { value: "1px" },
    "1.2": { value: "1.2px" },
    "1.5": { value: "1.5px" },
    "1.67": { value: "1.66667px" }, // 图标描边
    thick: { value: "2px" },
  },

  // ---------- 透明度 ----------
  opacity: {
    "60": { value: "0.6" },
    "75": { value: "0.75" },
    "20": { value: "0.20" },
  },

  // ---------- 层级 ----------
  zIndex: {
    base: { value: 0 },
    raised: { value: 1 }, // Sidebar
    overlay: { value: 33 }, // 稿中最高 z-index
  },
});
