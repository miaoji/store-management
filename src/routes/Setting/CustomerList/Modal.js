import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;

const ModalForm = ({ modalVisible, modalType, form, handleModalConfirm,
  handleModalVisible, currentItem }) => {
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const modalFormVal = {
        ...fieldsValue,
      };
      if (modalType === 'update') {
        modalFormVal.id = currentItem.id;
      }
      handleModalConfirm(modalFormVal, modalType);
    });
  };
  const title = modalType === 'add' ? '新建' : '修改';
  return (
    <Modal
      title={`${title}用户`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户名称"
      >
        {form.getFieldDecorator('customerName', {
          initialValue: currentItem.customer_name,
          rules: [{ required: true, message: '请输入客户名称' }],
        })(
          <Input placeholder="请输入客户名称" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户手机号"
      >
        {form.getFieldDecorator('customerMobile', {
          initialValue: currentItem.customer_mobile,
          rules: [{
            required: true,
            message: '请输入客户手机号',
            pattern: /^1\d{10}$/,
          }],
        })(
          <Input placeholder="请输入客户手机号" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户公司"
      >
        {form.getFieldDecorator('customerCompany', {
          initialValue: currentItem.customer_company,
          rules: [{ required: true, message: '请输入客户公司' }],
        })(
          <Input placeholder="请输入客户公司" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户地址"
      >
        {form.getFieldDecorator('customerAddress', {
          initialValue: currentItem.customer_address,
          rules: [{ required: true, message: '请输入客户地址' }],
        })(
          <Input placeholder="请输入客户地址" />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="充值金额"
      >
        {form.getFieldDecorator('totalAmount', {
          initialValue: currentItem.total_amount,
        })(
          <InputNumber min={0} />
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="客户邮编"
      >
        {form.getFieldDecorator('customerPostcode', {
          initialValue: currentItem.customer_postcode,
        })(
          <Input placeholder="请输入客户邮编" />
        )}
      </FormItem>
    </Modal>
  );
};

export default Form.create()(ModalForm);