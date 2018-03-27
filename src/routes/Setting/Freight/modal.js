import React from 'react';
import { Form, Input, Modal, Select } from 'antd';
import styles from './index.less';

// const { Option } = Select;

const FormItem = Form.Item;
const formItemLayout = {
  className: styles.medalItem,
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 15,
  },
};
const Modalbox = ({
  item,
  modalVisible,
  onOk,
  hideModal,
  title,
  countryInfo,
  getPackageInfo,
  getProductInfo,
  packageInfo,
  productInfo,
  packageDis,
  productDis,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };

  const handleCountryChange = (e) => {
    const countryId = Number(e.split('/')[0]);
    getPackageInfo({ countryId });
    setFieldsValue({
      package_type: undefined,
      product_type: undefined,
    });
  };

  const handlePackageChange = (e) => {
    const packageTypeId = Number(e.split('/')[0]);
    getProductInfo({ packageTypeId });
    setFieldsValue({
      product_type: undefined,
    });
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={handleOk} onCancel={() => hideModal()}>
      <FormItem label="目的地国家" hasFeedback {...formItemLayout}>
        {getFieldDecorator('destination', {
          initialValue: item.country_cn,
          rules: [
            {
              required: true,
              message: '请选择目的地国家!',
            },
          ],
        })(
          <Select placeholder="请选择目的地国家" style={{ width: '100%' }} showSearch onChange={handleCountryChange}>
            {countryInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="物品(包裹)类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('package_type', {
          initialValue: item.name_cn,
          rules: [
            {
              required: true,
              message: '请选择包裹类型!',
            },
          ],
        })(
          <Select placeholder="请选择包裹类型" disabled={packageDis} style={{ width: '100%' }} onChange={handlePackageChange}>
            {packageInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="产品类型" hasFeedback {...formItemLayout}>
        {getFieldDecorator('product_type', {
          initialValue: item.product_name,
          rules: [
            {
              required: true,
              message: '请选择产品类型!',
            },
          ],
        })(
          <Select placeholder="请选择产品类型" disabled={productDis} style={{ width: '100%' }}>
            {productInfo}
          </Select>
        )}
      </FormItem>
      <FormItem label="首重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('init_price', {
          initialValue: item.init_price,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="首重重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('init_weight', {
          initialValue: item.init_weight,
          rules: [
            {
              required: true,
              message: '请输入首重重量!',
            },
          ],
        })(<Input placeholder="请输入首重重量" />)}
      </FormItem>
      <FormItem label="续重价格(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('stepping_price', {
          initialValue: item.stepping_price,
          rules: [
            {
              required: true,
              message: '请输入续重价格!',
            },
          ],
        })(<Input placeholder="请输入续重价格" />)}
      </FormItem>
      <FormItem label="步进重量(kg)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('stepping_weight', {
          initialValue: item.stepping_weight,
          rules: [
            {
              required: true,
              message: '请输入步进重量!',
            },
          ],
        })(<Input placeholder="请输入步进重量" />)}
      </FormItem>
      <FormItem label="燃油附加费(￥)" hasFeedback {...formItemLayout}>
        {getFieldDecorator('fuel_charge', {
          initialValue: item.fuel_charge,
          rules: [
            {
              required: true,
              message: '请输入燃油附加费!',
            },
          ],
        })(<Input placeholder="请输入燃油附加费" />)}
      </FormItem>
      <FormItem label="邮编段" hasFeedback {...formItemLayout}>
        {getFieldDecorator('postcode', {
          initialValue: item.postcode,
          rules: [
            {
              required: true,
              message: '请添加邮编段!',
            },
          ],
        })(<Input placeholder="请添加邮编段" />)}
      </FormItem>
      <FormItem label="备注" hasFeedback {...formItemLayout}>
        {getFieldDecorator('remark', {
          initialValue: item.remark,
          rules: [
            {
              // required: true,
              message: '请输入备注信息!',
            },
          ],
        })(<Input placegolder="请输入备注信息" />)}
      </FormItem>
    </Modal>
  );
};

// Model.propTypes = {
//     onAdd: PropTypes.func,
//     switchIsMotion: PropTypes.func,
//     form: PropTypes.object,
//     Model: PropTypes.object,
//     onModelChange: PropTypes.func,
//     onDownLoad: PropTypes.func,
//     onSetJdConfig: PropTypes.func
// }

export default Form.create()(Modalbox);