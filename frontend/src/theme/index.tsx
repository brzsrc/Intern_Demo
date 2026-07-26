/**
 * 组装出口 —— 全项目只 import 这里
 * ------------------------------------------------------------------
 * Chakra UI v3:defineConfig + createSystem。
 *
 * 用法(main.tsx / App.tsx):
 *   import { ChakraProvider } from "@chakra-ui/react";
 *   import { system } from "@/theme";
 *
 *   <ChakraProvider value={system}>
 *     <App />
 *   </ChakraProvider>
 *
 * 别忘了在入口引入字体(index.html 或 CSS):
 *   Inter、Plus Jakarta Sans(Google Fonts 均有)
 */
import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

import {tokens} from "./tokens";
import {semanticTokens} from "./semantic-tokens";
import {textStyles} from "./text-styles";
import {layerStyles} from "./layer-styles";
import {buttonRecipe} from "./recipes/button";
import {cardRecipe} from "./recipes/card";
import {inputRecipe} from "./recipes/input";
import {badgeRecipe} from "./recipes/badge";
import {breakpoints} from "./breakpoints";

const config = defineConfig({
    // 生成 CSS 变量的前缀:var(--app-colors-neutral-800)
    cssVarsPrefix: "app",

    globalCss: {
        "*": {
            minWidth: 0,
        },
        // 稿中全局基调:Inter 正文、#0D0D0D 主文字、白底
        body: {
            fontFamily: "body",
            color: "fg",
            bg: "bg",
            // 稿中大量文字启用 Inter 的 stylistic alternates
            fontFeatureSettings: "'salt' on",
            // fontFeatureSettings: "normal",
        },
        "h1, h2, h3, h4": {
            fontFamily: "heading",
        },
    },

    theme: {
        breakpoints,
        tokens,
        semanticTokens,
        textStyles,
        layerStyles,
        recipes: {
            button: buttonRecipe, // 覆盖内置 Button
            input: inputRecipe, // 覆盖内置 Input
            badge: badgeRecipe, // 覆盖内置 Badge
        },
        slotRecipes: {
            card: cardRecipe, // 覆盖内置 Card
        },
    },
});

export const system = createSystem(defaultConfig, config);

// 需要在别处单独引用时的具名导出
export {tokens} from "./tokens";
export {semanticTokens} from "./semantic-tokens";
export {textStyles} from "./text-styles";
export {layerStyles} from "./layer-styles";
export {buttonRecipe} from "./recipes/button";
export {cardRecipe} from "./recipes/card";
export {inputRecipe} from "./recipes/input";
export {badgeRecipe} from "./recipes/badge";
