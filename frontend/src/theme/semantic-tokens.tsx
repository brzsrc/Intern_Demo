/**
 * 第 2 层:词汇的用途(Semantic Tokens)
 * ------------------------------------------------------------------
 * 回答"这个值拿来干什么"。组件与业务代码一律引用这一层,
 * 换肤/改色时只动这里,不动第 1 层。
 * 命名与 Figma 稿中的注释(Neutral/White、Gray/500…)一一对应。
 */
import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticTokens = defineSemanticTokens({
  colors: {
    // ---------- 背景 ----------
    bg: {
      DEFAULT: { value: { base: "{colors.neutral.0}", _dark: "{colors.neutral.900}" } }, // 页面/卡片:白 ↔ #161819
      subtle: { value: { base: "{colors.neutral.30}", _dark: "#1E2024" } }, // 输入框、表头:#F7F8FB ↔ 略浮起深面板
      inverted: { value: { base: "{colors.neutral.800}", _dark: "{colors.neutral.0}" } }, // 深色块:对调
      mainLayout: { value: { base: "{colors.gray.50}", _dark: "#111214" } }, // 内容区底:比卡片(#161819)再暗一档
      gray100: { value: { base: "{colors.gray.100}", _dark: "#26282C" } }, // 头像圈底 #F0F0F0 ↔ 深灰
      brandSubtle: { value: { base: "{colors.purpleAlpha.10}", _dark: "rgba(140, 123, 247, 0.18)" } }, // 紫淡底,深底提浓
      action: { value: { base: "{colors.green.100}", _dark: "{colors.green.800}" } }, // 绿底黑字,深浅通用
      actionChanged: { value: { base: "{colors.green.600/90}", _dark: "{colors.green.600/90}" } }, // hover,通用
      successSubtle: { value: { base: "{colors.greenAlpha.10}", _dark: "rgba(57, 223, 43, 0.16)" } }, // Active 徽章底
      successSoft: { value: { base: "{colors.greenAlpha.10soft}", _dark: "rgba(85, 186, 73, 0.16)" } }, // 柔和成功底
      dangerSubtle: { value: { base: "{colors.redAlpha.10}", _dark: "rgba(249, 107, 107, 0.16)" } }, // 错误徽章底
      scrim: { value: { base: "{colors.neutral.10/20}", _dark: "{colors.neutral.10/20}" } }, // 图片遮罩,通用
      yellowSubtle: { value: { base: "#FFEFE7", _dark: "rgba(255, 150, 0, 0.16)" } },
      active: { value: { base: "{colors.green.50}", _dark: "rgba(57, 223, 43, 0.12)" } }, // 侧边栏选中项
    },

    // ---------- 前景(文字/图标)----------
    fg: {
      DEFAULT: { value: { base: "{colors.neutral.800}", _dark: "#F2F3F5" } }, // 主文字:近黑 ↔ 近白(不用纯白)
      strong: { value: { base: "{colors.neutral.1000}", _dark: "{colors.neutral.0}" } }, // 纯黑 ↔ 纯白
      emphasis: { value: { base: "{colors.neutral.100}", _dark: "{colors.gray.200}" } }, // 深藏青 ↔ 浅 slate
      body: { value: { base: "{colors.neutral.900}", _dark: "#E6E7E9" } },
      muted: { value: { base: "{colors.neutral.60}", _dark: "{colors.neutral.50}" } }, // #64748B ↔ #94A3B8
      subtle: { value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.60}" } }, // 与 muted 对调
      placeholder: { value: { base: "{colors.neutral.500}", _dark: "#9A9DA3" } }, // #808080 深底上微提亮
      inverted: { value: { base: "{colors.neutral.0}", _dark: "{colors.neutral.800}" } }, // 跟 bg.inverted 对调
      invertedMuted: { value: { base: "{colors.whiteAlpha.80}", _dark: "rgba(0, 0, 0, 0.7)" } },
      brand: { value: { base: "{colors.purple.300}", _dark: "{colors.purple.200}" } }, // 深底升一档 #9D9BF2
      success: { value: { base: "#30CB22", _dark: "#30CB22" } }, // 亮绿,通用
      successStrong: { value: { base: "{colors.green.800}", _dark: "{colors.green.400}" } }, // #34AF25 ↔ #87DF36
      danger: { value: { base: "{colors.red.500}", _dark: "{colors.red.400}" } }, // #DA3F51 ↔ #F96B6B
      yellow: { value: { base: "#FF9600", _dark: "#FF9600" } }, // 通用
    },

    // ---------- 描边 ----------
    border: {
      DEFAULT: { value: "{colors.gray.100}" }, // 通用 1px 描边 #F0F0F0
      dashed: { value: "{colors.gray.200}" }, // 虚线框 #E2E8F0
      icon: { value: "{colors.gray.500}" }, // 图标描边 #667085
      strong: { value: "{colors.neutral.800}" }, // 1.5px 深描边
      strongNavy: { value: "{colors.neutral.100}" }, // 1.5px 藏青描边
      black: { value: "{colors.neutral.1000}" }, // 纯黑描边(1.2/1.5px)
      halfBlack: { value: "{colors.blackAlpha.50}" }, // 半透明黑描边
      mutedGray: { value: "{colors.neutral.500}" }, // #808080 描边
      brand: { value: "{colors.purple.300}" }, // 2px 紫描边
      success: { value: "{colors.green.600}" }, // 2px 绿描边 #78CF6F
      onDark: { value: "{colors.neutral.0}" }, // 2px 白描边(头像叠放)
    },
  },

  shadows: {
    elevation: {
      xs: { value: "{shadows.xs}" },
      button: { value: "{shadows.button}" },
      card: { value: "{shadows.card}" },
      popover: { value: "{shadows.popover}" },
    },
  },
});
