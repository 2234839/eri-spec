# NoteCalc — ERI 实现演示

**[English Version](./notecalc.en.md)**

NoteCalc 是一个真实的、完整可用的 ERI 实现。本文档逐步介绍每一个组成部分。

## NoteCalc 是什么

NoteCalc 是一个交互式计算笔记本。你输入数学表达式，它实时计算结果。它支持：

- 基本运算：`1 + 2`、`3 * 4`
- 变量（支持中文）：`价格 = 99.5`、`总价 = 价格 * 3`
- 单位转换：`5 kg to g`、`10 km to mi`
- 等式验证：`1 + 2 = 3` → `true`
- 数学函数：`sqrt(16)`、`sin(1)`、`log(100)`
- 常量：`pi`、`e`

在线体验：[https://tsfullstack.heartstack.space/noteCalc](https://tsfullstack.heartstack.space/noteCalc)

## ERI 集成

### 1. 嵌入式页面

嵌入式页面（`/noteCalc/embed`）是 NoteCalc 的精简版本：

- 从 URL hash 读取初始内容：`https://...noteCalc/embed#expr1\nexpr2`
- 完整的 CodeMirror 编辑器，实时计算
- 无工具栏、无侧边栏——极简 UI
- 加载时自动计算

实现：约 40 行 Vue 代码。就这样。

```vue
<template>
  <div class="note-calc-embed">
    <CodeMirrorEditor v-model="content" :config="embedConfig" hide-toolbar />
  </div>
</template>

<script setup lang="ts">
const content = ref('');
const embedConfig = ref({ isAutoCalculate: true, precision: 64, showPrecision: 4 });

onMounted(() => {
  const hashContent = window.location.hash.slice(1);
  if (hashContent) {
    content.value = decodeURIComponent(hashContent).replace(/\\n/g, '\n');
  }
});
</script>
```

### 2. API

计算 API 是一个标准的 REST 端点：

```
POST https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate
Content-Type: application/json

[{"content":"价格 = 99.5\n总价 = 价格 * 3"}]
```

响应（superjson 格式）：
```json
{
  "json": {
    "result": {
      "results": [
        {"line": "价格 = 99.5", "type": "assignment", "result": "99.5", "variable": "价格"},
        {"line": "总价 = 价格 * 3", "type": "assignment", "result": "298.5", "variable": "总价"}
      ]
    }
  }
}
```

### 3. Skill 定义

完整的 `skill.md`：

```markdown
---
name: notecalc
description: 数学表达式计算工具。支持变量赋值、单位转换、等式验证。当用户需要进行数学计算时使用此技能。
---

## 工作流

1. 理解用户的计算需求，将问题转化为表达式
2. 调用 API 计算并验算——确保结果正确后再回复用户
3. 展示结果给用户——使用截图或 iframe（优先截图，因为多数 AI 助手不支持渲染 iframe）

## 表达式语法

每行写一个表达式，用 \\n 分隔多行。支持：
- 赋值：价格 = 99.5（变量名支持中文）
- 运算符：+ - * / ^ %
- 函数：sqrt, abs, pow, sin, cos, tan, log, log2, log10, exp, ceil, floor, round, max, min
- 常量：pi, e
- 单位转换：5 kg to g
- 等式验证：1 + 2 = 3
- 百分比：50%, 200 * 15%

## API 调用

POST https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate
Content-Type: application/json
Body: [{"content":"1 + 2\\n价格 = 99.5\\n总价 = 价格 * 3"}]

## 展示结果

### 方式一：截图（推荐）
https://api.microlink.io/?url=https://tsfullstack.heartstack.space/noteCalc/embed%23{URLEncoded内容}&screenshot=true&embed=screenshot.url&viewport.width=600&viewport.height=400

### 方式二：iframe（适用于支持 iframe 的环境）
<iframe src="https://tsfullstack.heartstack.space/noteCalc/embed#1 + 2\\n价格 = 99.5" width="100%" height="300" />
```

### 4. 对话流程

```
用户: "帮我算 3 件商品，每件 99.5 元，加 8% 的税"

Agent:
  1. 构造表达式:
     价格 = 99.5
     总价 = 价格 * 3
     税 = 总价 * 0.08

  2. 调用 API → 得到 {总价: 298.5, 税: 23.88}

  3. 输出 iframe:
     <iframe src="https://tsfullstack.heartstack.space/noteCalc/embed
       #价格 = 99.5%5Cn总价 = 价格 * 3%5Cn税 = 总价 * 0.08"
       width="100%" height="300" />

  用户看到一个可交互的计算器：
     价格 = 99.5            → 99.5
     总价 = 价格 * 3         → 298.5
     税 = 总价 * 0.08        → 23.88

  用户把价格改为 120 → 结果即时更新：
     价格 = 120             → 120
     总价 = 价格 * 3         → 360
     税 = 总价 * 0.08        → 28.8

用户: "那 5 件呢？"

Agent:
  读取上下文（价格=99.5，知道计算模式）
  构造新表达式，调用 API，输出新的 iframe：
     价格 = 99.5
     总价 = 价格 * 5
     税 = 总价 * 0.08
```

## 架构总结

```
┌────────────────────────────────────────────────────────┐
│                   Skill 作者                            │
│                （编写 skill.md）                         │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                   AI Agent                              │
│  1. 读取 skill.md 工作流                                │
│  2. 调用 NoteCalc API                                   │
│  3. 构造嵌入 URL                                        │
│  4. 输出 iframe/截图                                    │
└──────────────────────────┬─────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │    NoteCalc 嵌入页面      │
              │  （读取 hash，计算，       │
              │   展示交互式 UI）          │
              └─────────────────────────┘
```

## 核心要点

1. **嵌入页面 = 40 行代码**。任何 Web 应用都可以做到。
2. **Skill 定义 = 1 个 markdown 文件**。无 SDK，无库。
3. **用户体验比纯文字输出好得多**。
4. **Agent 不需要理解 UI**。它只需构造一个 URL。
5. **用户的编辑是即时的**。不需要与 Agent 往返。

## 试试看

- [在线 NoteCalc](https://tsfullstack.heartstack.space/noteCalc)
- [嵌入页面示例](https://tsfullstack.heartstack.space/noteCalc/embed#price%20%3D%2099.5%5Cntotal%20%3D%20price%20*%203)
- [交互式 Agent 演示](../docs/index.html)
