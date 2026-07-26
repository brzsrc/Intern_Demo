/**
 * 第 4 层:Input recipe
 * ------------------------------------------------------------------
 * 来源:稿中 `Input`(出现 68 次)的两种形态:
 * ① 白底描边:padding 10px 14px、bg #FFF、border 1px #F0F0F0、radius 6px
 * ② 浅灰嵌入:padding 12px 14px、bg #F7F8FB、border-bottom 1px #F0F0F0
 * 占位文字为 Inter(#808080)。
 */
import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  className: "input",
  base: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "2", // 8px
    textStyle: "sm.medium.salt",
    color: "fg",
    fontFeatureSettings: "'salt' on",
    _placeholder: {
      color: "fg.placeholder", // #808080
    },
    outline: "none",
  },
  variants: {
    variant: {
      // 形态①:白底描边输入框
      outline: {
        px: "3.5", // 14px
        py: "2.5", // 10px
        bg: "bg", // #FFFFFF
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border", // #F0F0F0
        borderRadius: "sm", // 6px
      },
    },
    size: {
      // 稿中矮输入框:高 32px
      sm: { h: "32px" },
      // md: { h: "45px", w: "544px" },
      md: { h: "45px" },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "sm",
  },
});
