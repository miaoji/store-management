import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from './index.less';
import Filter from './Filter';
import List from './List';
import { handleFields } from '../../../utils/time';
import { queryUrl } from '../../../utils';

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(({ customerbatch, loading }) => ({
  customerbatch,
  loading: loading.models.customerbatch,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    formValues: {},
  };

  componentDidMount() {
    const { dispatch, form } = this.props;
    const { href } = window.location;
    const querys = queryUrl(href);
    dispatch({
      type: 'customerbatch/fetch',
      payload: querys,
    });
    form.setFieldsValue(querys);
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

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
      type: 'customerbatch/fetch',
      payload: params,
    });
  }

  handleSearchReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'customerbatch/fetch',
      payload: {},
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let item = {};

      const values = {
        ...fieldsValue,
      };

      if (!values.createTime) {
        item = values;
      }
      item = handleFields(values);

      this.setState({
        formValues: item,
      });

      dispatch({
        type: 'customerbatch/fetch',
        payload: item,
      });
    });
  }

  render() {
    const {
      customerbatch: { data },
      loading,
      form,
    } = this.props;

    const filterProps = {
      form,
      handleSearch: this.handleSearch,
      handleSearchReset: this.handleSearchReset,
    };

    const listProps = {
      data,
      loading,
      handleStandardTableChange: this.handleStandardTableChange,
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <Filter
                {...filterProps}
              />
            </div>
            <List
              {...listProps}
            />
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}