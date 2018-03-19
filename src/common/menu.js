import { isUrl } from '../utils/utils';

const menuData = [{
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}, {
  name: '操作管理',
  icon: 'table',
  path: 'operate',
  children: [{
    name: '入库扫描',
    path: 'entry-scanning',
  }, {
    name: '出库扫描',
    path: 'outbound-scanning',
  }],
}, {
  name: '基础数据设置',
  icon: 'form',
  path: 'setting',
  children: [{
    name: '客户信息管理',
    path: 'customer',
  }, {
    name: '仓管费配置',
    path: 'warehouse-fee',
  }, {
    name: '快递公司配置',
    path: 'express-company',
  }, {
    name: '运费配置',
    path: 'freight',
  }, {
    name: '出库类型配置',
    path: 'outbound-scanning',
  }],
}, {
  name: '查询统计',
  icon: 'book',
  path: 'query',
  children: [{
    name: '货架查询',
    path: 'shelves',
  }, {
    name: '快件查询',
    path: 'expre',
  }, {
    name: '出库查询',
    path: 'getout',
  }, {
    name: '入库查询',
    path: 'getinto',
  }],
}, {
  name: '测试单元',
  icon: 'book',
  path: 'demo',
  children: [{
    name: '测试1',
    path: 'test1',
  }, {
    name: '测试2',
    path: 'test2',
  }, {
    name: '测试3',
    path: 'test3',
  }, {
    name: '测试4',
    path: 'test4',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);