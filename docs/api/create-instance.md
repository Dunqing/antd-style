---
title: createInstance
description: 创建样式实例方法
group:
  title: 组件研发
  order: 10
---

## 简介

使用 `createInstance` 可以创建另一组样式实例方法。对于应用样式方案来说这个方法基本用不到。但对于组件研发的场景则非常必要。

## 创建样式实例

为组件创建自己的样式实例，这样当使用组件库时可自动获得一套配置好默认值的样式方法。

```ts | pure
import { createInstance } from 'antd-style';

interface DefaultToken {
  accessColor: string;
}

const styleInstance = createInstance<DefaultToken>({
  // **** 样式生成相关 **** //

  key: 'abc', // 设定生成 hash 类名的前缀，结果为 .abc-xxxx
  speedy: false, // 目前的 cssinjs 方案中默认的 cssom 的插入方式与 qiankun 微应用兼容性都不太理想，所以建议关闭
  hashPriority: 'low', // 将生成 hash 的样式选择器设为 :where 选择器降低权重。这样可以让用户自定义的样式覆盖组件的样式

  // ***** 主题相关 ***** //

  // 配置默认传给 ThemeProvider 的 props，而该 Provider 同样可以被外部覆盖 props
  // 配置后的值也会成为相关方法消费的默认值，这样一来不需要包裹 ThemeProvider 即可消费到默认值
  ThemeProvider: {
    prefixCls: 'tna', // 设定 antd 组件的 类名前缀，例如 Button 的类型将会是 .tna-btn
  },
});

export const {
  // **** 核心样式方法 **** //

  createStyles,
  createStyish,
  createGlobalStyle,

  // **** 基础样式方法 **** //
  cx,
  css,
  keyframes,

  //****  样式表管理  **** //
  cache,
  sheet,
  flush,
  merge,
  hydrate,
  getRegisteredStyles,

  // ****  数据容器   **** //
  StyleProvider,
  ThemeProvider,
  useTheme,
} = styleInstance;
```

## 兼容 styled 主题方案

无论是 `styled-component` 还是 `emotion/styled`，如果需要响应主题变化，都需要在组件外部包裹一个 `ThemeProvider`。这个时候，如果你的组件也需要响应主题变化，就需要在组件内部再包裹一个 `ThemeProvider`，通过在 createInstance 中传入 `styled` 的配置，即可让 `styled` 后的组件也响应自定义 Token。

```ts | pure
// styled-components 版本
import { createInstance } from 'antd-style';
import { ThemeProvider, useTheme } from 'styled-components';

const componentStyleIntanceWithSC = createInstance({
  // ...
  styled: {
    ThemeProvider,
    useTheme,
  },
});
```

```ts | pure
// @emotion/react 版本
import { ThemeProvider, useTheme } from '@emotion/react';
import { createInstance } from 'antd-style';

const componentStyleIntanceWithEmotion = createInstance({
  // ...
  styled: {
    ThemeProvider,
    useTheme,
  },
});
```