import {
  ProColumns,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  // 点击取消
  onCancel: () => void;
  // 点击提交
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 是否可见
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns } = props;

  return <Modal visible={ visible } >
    <ProTable type="form" columns={ columns } />
    </Modal>;

};
export default CreateModal;
