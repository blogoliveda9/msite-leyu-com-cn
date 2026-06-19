// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤模块

const contentMap = {
  siteUrl: "https://msite-leyu.com.cn",
  primaryKeyword: "乐鱼体育",
  sections: [
    {
      id: "news",
      title: "体育新闻",
      description: "最新赛事报道与深度分析",
      tags: ["乐鱼体育", "赛事速递", "比分直播"],
      items: [
        { title: "NBA季后赛前瞻", date: "2025-04-10", url: "/news/nba-playoffs" },
        { title: "中超联赛积分榜", date: "2025-04-09", url: "/news/csl-standings" }
      ]
    },
    {
      id: "live",
      title: "直播大厅",
      description: "多机位高清赛事直播",
      tags: ["乐鱼体育", "现场直播", "高清流"],
      items: [
        { title: "英超 曼城vs利物浦", date: "2025-04-11", url: "/live/premier-league" },
        { title: "NBA 湖人vs勇士", date: "2025-04-12", url: "/live/nba-lakers-warriors" }
      ]
    },
    {
      id: "highlights",
      title: "精彩集锦",
      description: "进球回放与花絮剪辑",
      tags: ["乐鱼体育", "高光时刻", "十佳球"],
      items: [
        { title: "欧冠本周十佳球", date: "2025-04-08", url: "/highlights/top10-champions" },
        { title: "CBA决赛精彩回顾", date: "2025-04-07", url: "/highlights/cba-finals" }
      ]
    },
    {
      id: "stats",
      title: "数据统计",
      description: "球员与球队数据可视化",
      tags: ["乐鱼体育", "数据看板", "排行榜"],
      items: [
        { title: "射手榜", date: "2025-04-10", url: "/stats/top-scorers" },
        { title: "助攻榜", date: "2025-04-10", url: "/stats/top-assists" }
      ]
    }
  ]
};

/**
 * 根据关键词搜索内容项
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配的内容项列表
 */
function searchContent(keyword) {
  if (!keyword || typeof keyword !== "string") return [];
  const lowerKeyword = keyword.toLowerCase().trim();
  if (lowerKeyword.length === 0) return [];

  const results = [];
  for (const section of contentMap.sections) {
    for (const item of section.items) {
      const matchTitle = item.title.toLowerCase().includes(lowerKeyword);
      const matchTags = section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));
      if (matchTitle || matchTags) {
        results.push({
          sectionId: section.id,
          sectionTitle: section.title,
          item: item
        });
      }
    }
  }
  return results;
}

/**
 * 按分区获取所有内容项
 * @param {string} sectionId - 分区标识符
 * @returns {Array} 该分区的内容项列表
 */
function getSectionItems(sectionId) {
  const section = contentMap.sections.find(s => s.id === sectionId);
  return section ? section.items : [];
}

/**
 * 获取所有标签（去重）
 * @returns {string[]} 所有标签数组
 */
function getAllTags() {
  const tagSet = new Set();
  for (const section of contentMap.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

// 简单演示：搜索“乐鱼体育”相关的内容
const demoResults = searchContent("乐鱼体育");
console.log("搜索 '乐鱼体育' 结果数量:", demoResults.length);
demoResults.forEach(r => console.log(` - [${r.sectionTitle}] ${r.item.title}`));

// 导出供其他模块使用（如果运行环境支持模块）
if (typeof module !== "undefined" && module.exports) {
  module.exports = { contentMap, searchContent, getSectionItems, getAllTags };
}