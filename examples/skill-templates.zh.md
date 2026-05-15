# ERI Skill 模板

**[English Version](./skill-templates.en.md)**

常见 ERI 场景的即用型 Skill 定义模板。每个模板展示了 `skill.md` 的结构——替换 URL 和字段名为你自己的即可。

---

## 1. 图表 / 数据可视化

```markdown
---
name: chart-generator
description: 从数据生成交互式图表。支持柱状图、折线图、饼图、散点图。
---

## 工作流
1. 从用户请求中提取数据和图表类型
2. 调用 API 生成图表配置
3. 以 iframe 嵌入交互式图表

## API
POST https://api.example.com/chart
Body: {"type": "bar", "labels": ["Q1","Q2","Q3"], "values": [120, 340, 250]}

## 嵌入
iframe: https://app.example.com/chart/embed#base64encoded_config
```

**用户体验**：Agent 生成图表。用户可以切换图表类型、调整数据点、缩放——全在嵌入的 UI 内完成。

---

## 2. 表单生成器

```markdown
---
name: form-builder
description: 生成可填写的表单。支持文本、数字、下拉选择、复选框、日期字段。
---

## 工作流
1. 从用户描述中提取表单字段
2. 调用 API 生成表单 schema
3. 以 iframe 嵌入交互式表单

## API
POST https://api.example.com/form
Body: {"fields": [{"name": "email", "type": "email", "required": true}]}

## 嵌入
iframe: https://app.example.com/form/embed#base64encoded_schema
```

**用户体验**：Agent 生成表单。用户可以填写、调整字段、添加选项——表单提交回对话上下文。

---

## 3. 代码编辑器 / 运行环境

```markdown
---
name: code-runner
description: 在多种语言中运行代码片段。显示输出，支持编辑。
---

## 工作流
1. 从用户请求中提取代码和语言
2. 调用 API 执行代码并获取输出
3. 以 iframe 嵌入交互式代码编辑器

## API
POST https://api.example.com/execute
Body: {"language": "python", "code": "print('hello')"}

## 嵌入
iframe: https://app.example.com/playground/embed#base64encoded_code&lang=python
```

**用户体验**：Agent 编写代码、运行、展示输出。用户可以修改代码并重新运行——无需与 Agent 往返。

---

## 4. 调色板 / 设计工具

```markdown
---
name: palette-generator
description: 从描述或基础色生成调色板。支持导出。
---

## 工作流
1. 从用户描述中提取颜色需求
2. 调用 API 生成调色板
3. 以 iframe 嵌入交互式调色板编辑器

## API
POST https://api.example.com/palette
Body: {"base": "#6366f1", "count": 5, "mode": "analogous"}

## 嵌入
iframe: https://app.example.com/palette/embed#base64encoded_config
```

**用户体验**：Agent 生成调色板。用户可以拖动色标、调整色相、复制十六进制值——全部可视化操作。

---

## 5. 地图 / 位置

```markdown
---
name: map-viewer
description: 在交互式地图上显示位置、路线和地理数据。
---

## 工作流
1. 从用户请求中提取位置或路线
2. 调用 API 进行地理编码并获取地图数据
3. 以 iframe 嵌入交互式地图

## API
POST https://api.example.com/geocode
Body: {"locations": ["北京", "上海"]}

## 嵌入
iframe: https://app.example.com/map/embed#encoded_markers
```

**用户体验**：Agent 标注位置。用户可以缩放、平移、添加/删除标记——标准地图交互。

---

## 如何适配这些模板

1. 将 `app.example.com` 替换为你的实际域名
2. 将 API 端点替换为你的真实端点
3. 调整嵌入 URL 格式以匹配你嵌入页面的参数结构
4. 添加你特定的字段名、数据格式和选项

每个模板遵循相同的 ERI 模式：**理解 → 调用 API → 构造 URL → 嵌入 UI**。
