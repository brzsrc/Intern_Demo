/**
 * 第 4 层:Card slot recipe(多部件组件)
 * ------------------------------------------------------------------
 * 来源:稿中主卡片(bg #FFF、radius 16px、padding 32px/24px)、
 * 标题为 Heading/XSmall 或 Display/XXSmall,正文为 Inter 系列。
 */
import { defineSlotRecipe } from "@chakra-ui/react";

export const cardRecipe = defineSlotRecipe({
  className: "card",
  slots: ["root", "header", "title", "description", "body", "footer"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      bg: "bg",
      borderRadius: "xl", // 16px
      overflow: "hidden",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      gap: "3", // 12px
    },
    title: {
      textStyle: "heading.large",
      color: "fg",
    },
    description: {
      textStyle: "heading.medium",
      color: "fg.placeholder", // #808080
    },
    body: {
      display: "flex",
      flexDirection: "column",
      flex: "1",
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "2", // 8px
    },
  },
  variants: {
    variant: {
      // 描边卡 + 柔投影(列表/统计卡:padding 24px)
      outlined: {
        root: {
          p: "6", // 24px
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "border",
          boxShadow: "card", // 0 4px 9px rgba(22,43,82,.04)
        },
      },
      // 浮起卡(drop-shadow 0 4px 20px rgba(30,32,51,.05))
      elevated: {
        root: {
          p: "6",
          filter: "dropSoft",
        },
      },
    },
    size: {
      md: {},
      // 紧凑卡(padding 16px)
      sm: { root: { p: "4" } },
    },
  },
  defaultVariants: {
    variant: "outlined",
    size: "md",
  },
});
