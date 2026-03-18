export function extractHeadings(content) {
  // 使用正则匹配所有的 ## 和 ### 标题
  // 假设你的标题格式是: ## 标题内容
  const headingLines = content.split('\n').filter(line => 
    line.match(/^###?\s/)
  );

  return headingLines.map(line => {
    const level = line.split(' ')[0].length; // 2 代表 h2, 3 代表 h3
    const value = line.replace(/^###?\s/, '').trim();
    const id = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u4e00-\u9fa5-]/g, ''); // 支持中文字符转 ID

    return { depth: level, value, id };
  });
}