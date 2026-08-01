/**
 * 第 4 层:Badge recipe(状态徽章)
 * ------------------------------------------------------------------
 * 来源:稿中表格状态胶囊:
 * - Active:文字 Inter 600 14/160% #30CB22,底 rgba(57,223,43,.1),radius 32px
 * - 错误:  文字 #F96B6B,底 rgba(249,107,107,.1),radius 32px
 * - 柔和成功:底 rgba(85,186,73,.1),radius 16px,文字 #34AF25
 * - 品牌紫:文字 #8C7BF7(semibold 14/160%)
 * 内边距:2px 6px(小)/ 6px 12px(标准)。
 */
import { defineRecipe } from "@chakra-ui/react";

export const badgeRecipe = defineRecipe({
  className: "badge",
  base: {
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5", // 6px
    textStyle: "body.sm.semibold", // Inter 600 14/160%
    flex: "none",
  },
  variants: {
    variant: {
      success: {
        bg: "bg.successSubtle", // rgba(57,223,43,.1)
        color: "fg.success", // #30CB22
      },
      danger: {
        bg: "bg.dangerSubtle", // rgba(249,107,107,.1)
        color: "fg.danger", // #F96B6B
      },

      yellow: {
        bg: "bg.yellowSubtle",
        color: "fg.yellow",
      },

      brand: {
        bg: "bg.brandSubtle", // rgba(140,123,247,.1)
        color: "fg.brand", // #8C7BF7
      },
      neutral: {
        bg: "bg", // #F7F8FB
        color: "fg", // #64748B
      },
      subtle: {
        bg: "bg.scrim",
        color: "fg.inverted",
        backdropFilter: "blur(4px)",
      },
      standard: {
        bg: "bg.scrimSubtle",
        color: "fg.muted",
      },
    },
    size: {
      sm: { px: "1.5", py: "0.5", borderRadius: "sm" }, // 2px 6px
      md: { px: "3", py: "1.5",borderRadius: "sm" }, // 6px 12px
    },
  },
  defaultVariants: {
    variant: "success",
    size: "md",
  },
});
