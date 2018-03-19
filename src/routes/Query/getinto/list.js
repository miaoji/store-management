import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Dropdown, Icon, Menu } from 'antd';
import StandardTable from 'components/StandardTable';
import styles from './index.less';

const List = ({
  data,
  selectedRows,
  loading,
  onSelectRow,
  onChange,
  handleMenuClick,
  // showModal,
}) => {
  // const handleUpdata = (record) => {
  //   showModal(record);
  // };
  const columns = [
    {
      title: '单号',
      dataIndex: 'order_no',
      key: 'order_no',
    },
    {
      title: '客户编码',
      dataIndex: 'customer_no',
      key: 'customer_no',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      // sorter: true,
      // align: 'right',
      // render: val => `${val} 万`,
      // needTotal: true,
    },
    {
      title: '货架号',
      dataIndex: 'shelf_no',
      key: 'shelf_no',
    },
    {
      title: '仓管费',
      dataIndex: 'cargo_charge',
      key: 'cargo_charge',
    },
    {
      title: '快递公司',
      dataIndex: 'express_company_code',
      key: 'express_company_code',
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <a href="">查看</a>
          <Divider type="vertical" />
          <a href="">修改</a>
        </Fragment>
      ),
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="remove">删除</Menu.Item>
      <Menu.Item key="approval">批量审批</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className={styles.tableListOperator}>
        {
          selectedRows.length > 0 && (
            <span>
              <Button>批量操作</Button>
              <Dropdown overlay={menu}>
                <Button>
                  更多操作 <Icon type="down" />
                </Button>
              </Dropdown>
            </span>
          )
        }
      </div>
      <StandardTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        pagination={data.pagination}
        columns={columns}
        onSelectRow={onSelectRow}
        onChange={onChange}
        total={30}
      />
    </div>
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
  // selectedRows: PropTypes.any,
  // loading: PropTypes.bool,
  // onSelectRow,
  // onChange
};

export default List;