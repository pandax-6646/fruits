import Mock from 'mockjs'
import qs from "querystring"

Mock.mock('product/getBanners', 'get', {
  code: 666,
  msg: "success",
  "banners|3-5": [
    "@Image('375x210','@color','小甜甜')"
  ]
})


Mock.mock('category/all', 'get', {
  code: 666,
  msg: "success",
  "list|8": [{
    'categoryId|+1': 1,
    iconUrl: "@Image('68x68','@color','小甜甜')",
    name: "@ctitle(4)"
  }]
})




Mock.mock(/^product\/list(\?.+)?$/, 'get', (options) => {
  return Mock.mock({
    code: 666,
    msg: "success",
    pageNum: 1,
    "list|10": [{
      'categoryId|+1': 1,
      imgUrl: "@Image('180x180','@color','小甜甜')",
      categoryName: "@ctitle(8)",
      "inventory|8000-15000": 8000,
      "minPrice|3000-10000": 3000,
      masterName: "@cparagraph(1,10,30)",
      "productId|10000000-999999999": 10000000,
      slaveName: "@cparagraph(1,10,30)"
    }]
  })
})

Mock.mock(/^product\/detail(\?.+)?$/, 'get', (options) => {
  return Mock.mock({
    code: 666,
    msg: "success",
    pageNum: 1,
    result: {
      'categoryId|+1': 1,
      imgUrl: "@Image('180x180','@color','小甜甜')",
      categoryName: "@ctitle(5)",
      "inventory|8000-15000": 8000,
      "minPrice|3000-10000": 3000,
      masterName: "@cparagraph(1,10,30)",
      "productId|10000000-999999999": 10000000,
      slaveName: "@cparagraph(1,10,30)",
      "banners|2-8": ["@Image('375x335','@color','小甜甜')"],
      "descPics|5-20":["@Image('375x335','@color','小甜甜')"]
    }
  })
})
