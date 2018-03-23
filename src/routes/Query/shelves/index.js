import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import List from './list';
import Modal from './modal';
import Filter from './filter';

import styles from './index.less';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ shelves, user, loading }) => ({
  shelves,
  user,
  loading: loading.models.shelves,
}))
export default class TableList extends PureComponent {
  state = {
    selectedRows: [],
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'shelves/query',
    });
  }

  render() {
    const {
      location,
      shelves: { data, list, total, modalVisible, modalType, currentItem },
      user,
      loading,
      dispatch,
    } = this.props;
    const { selectedRows } = this.state;
    const global = this;
    const formValues = {};

    console.log('user', user);
    const filterProps = {
      filter: {
        ...location.query,
      },
      handleFormReset() {
        dispatch({
          type: 'shelves/query',
          payload: {},
        });
      },
      handleSearch(values) {
        dispatch({
          type: 'shelves/query',
          payload: values,
        });
      },
      showModal() {
        dispatch({
          type: 'shelves/setStates',
          payload: {
            modalVisible: true,
            modalType: 'create',
            currentItem: {},
          },
        });
      },
    };

    const modalProps = {
      item: currentItem,
      title: modalType === 'create' ? '新建规则' : '修改规则',
      onOk(item) {
        dispatch({
          type: `shelves/${modalType}`,
          payload: {
            ...item,
          },
        });
      },
      hideModal() {
        dispatch({
          type: 'shelves/setStates',
          payload: {
            modalVisible: false,
          },
        });
      },
      modalVisible,
    };

    const listProps = {
      selectedRows,
      loading,
      data: {
        list,
        pagination: { ...data.pagination, total },
      },
      showModal(item) {
        dispatch({
          type: 'shelves/setStates',
          payload: {
            modalVisible: true,
            modalType: 'updata',
            currentItem: item,
          },
        });
      },
      onSelectRow(rows) {
        global.setState({
          selectedRows: rows,
        });
        dispatch({
          type: 'shelves/setStates',
          payload: {
            selectedRows: [...rows],
          },
        });
      },
      onChange(pagination, filtersArg, sorter) {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = { ...obj };
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});
        const params = {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          ...formValues,
          ...filters,
        };
        if (sorter.field) {
          params.sorter = `${sorter.field}_${sorter.order}`;
        }
        dispatch({
          type: 'shelves/query',
          payload: params,
        });
      },
      handleMenuClick(e) {
        if (!selectedRows) return;
        switch (e.key) {
          case 'remove':
            dispatch({
              type: 'shelves/remove',
              payload: {
                no: selectedRows.map(row => row.no).join(','),
              },
              callback: () => {
              },
            });
            break;
          default:
            break;
        }
      },
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter {...filterProps} />
            </div>
            <List {...listProps} />
          </div>
        </Card>
        <Modal
          {...modalProps}
        />
      </PageHeaderLayout>
    );
  }
}
