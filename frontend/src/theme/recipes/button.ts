/**
 * 第 4 层:Button recipe(单元素组件)
 * ------------------------------------------------------------------
 * 来源:稿中 `_Button base`(padding 8px 12px、gap 8px、radius 8px、
 * bg #C9F8C1、Shadow/xs)与 `Button/1`(radius 12px、投影
 * 0 4px 6px -2px rgba(0,0,0,.03)),文字为 Inter 500 14px/150% 'salt' on。
 */
import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  className: "btn",
  base: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "2", // 8px
    px: "3", // 12px
    py: "2", // 8px
    borderRadius: "md", // 8px
    cursor: "pointer",
    flex: "none",
    textDecoration: "none",
    _hover: {
      textDecoration: "none" },
  },
  variants: {
    variant: {
      // 主行动按钮:_Button base(绿底黑字)
      action: {
        bg: "bg.action", // #C9F8C1
        color: "fg", // #0D0D0D
        boxShadow: "xs", // Shadow/xs
        _hover: {
          bg: "bg.actionChanged"
        }
      },
      // Button/1:大圆角浅投影(白底)
      soft: {
        bg: "bg",
        color: "fg",
        borderRadius: "lg", // 12px
        boxShadow: "button", // 0 4px 6px -2px rgba(0,0,0,.03)
      },

      // 深色实心(#0D0D0D 底白字)
      solid: {
        bg: "bg.inverted",
        color: "fg.inverted",
      },
      // 描边按钮(1px #F0F0F0)
      outline: {
        bg: "bg",
        color: "fg",
        borderWidth: "thin",
        borderStyle: "solid",
        borderColor: "border",
        boxShadow: "xs",
      },
      // 幽灵按钮(灰字,悬停无底)
      ghost: {
        justifyContent: "left",
        bg: "transparent",
        color: "fg.placeholder", // #808080
        textDecoration: "none",
        _hover: {textDecoration: "none",
          bg: "bg.subtle"
        },
      },
      active: {
        justifyContent: "left",
        bg: "bg.active",
        color: "fg", // #808080
        textDecoration: "none",
        _hover: {textDecoration: "none" },
      },

    },
    size: {
      // 稿中按钮高 40px(padding 8px 12px)
      md: { h: "40px", px: "3", py: "2", textStyle: "body.sm.medium.normal" },
      // 稿中小控件高 32px(padding 6px 12px)
      sm: { h: "32px", px: "3", py: "1.5", borderRadius: "sm", textStyle: "body.sm.medium.normal" },
      // 大按钮(padding 12px 16px)
      lg: { px: "4", py: "3", borderRadius: "lg", textStyle: "body.sm.medium.normal"},
    },
  },
  defaultVariants: {
    variant: "action",
    size: "md",
  },
});
