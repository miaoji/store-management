import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { query } from '../services/query/abnormal';

export default modelExtend(pageModel, {
  namespace: 'abnormal',

  state: {
    list: [],
    total: 0,
    data: {
      pagination: {},
    },
    loading: false,
    currentItem: {},
    modalType: 'create',
    modalVisible: false,
    selectedRows: [],
    expressList: [],
  },

  effects: {

    *query({ payload = {
      currentPage: 1,
      pageSize: 10,
    } }, { call, put }) {
      const data = yield call(query, {
        ...payload,
        currentPage: Number(payload.currentPage) || 1,
        pageSize: Number(payload.pageSize) || 10,
      });
      if (data.code === 200) {
        const list = data.data.map((item) => {
          return { key: item.id, ...item };
        });
        yield put({
          type: 'setStates',
          payload: {
            list,
            total: data.total,
          },
        });
      } else {
        yield put({
          type: 'setStates',
          payload: {
            list: [],
            total: 0,
          },
        });
      }
    },

  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
});
