const pxToRem = (pxValue, baseFontSize = 16) => {
  return `${(parseFloat(pxValue) / baseFontSize).toFixed(5)}rem`
}

const transformInlineStyles = (content, baseFontSize = 16) => {
  // 使用正则表达式匹配行内样式中的 px 值并转换它们
  return content.replace(/([0-9]+\.?[0-9]*)px/g, (match, p) =>
    pxToRem(p, baseFontSize),
  )
}

export default function vitePluginPxToRemSimple(options = {}) {
  const { baseFontSize = 16 } = options

  return {
    name: 'vite-plugin-px-to-rem-simple',
    async transform(source, id) {
      if (!id.endsWith('.vue')) {
        return null // 只转换 .vue 文件
      }

      // 读取 Vue 文件内容
      const fileContent = source.toString()
      // 提取 <template> 部分
      const templateMatch = fileContent.match(
        /<template[\s\S]*?>([\s\S]*?)<\/template>/,
      )
      if (!templateMatch) {
        return null // 如果没有 <template> 部分，则不进行转换
      }

      const templateContent = templateMatch[1]

      // 转换行内样式中的 px 值
      const transformedTemplateContent = transformInlineStyles(
        templateContent,
        baseFontSize,
      )

      // 将转换后的 <template> 部分放回原文件中（这里为了简化，我们假设 <template> 是唯一的，并且不考虑其他复杂情况）
      const transformedFileContent = fileContent.replace(
        templateContent,
        transformedTemplateContent,
      )
      return transformedFileContent
    },
  }
}
