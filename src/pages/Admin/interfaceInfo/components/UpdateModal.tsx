import {
  ProColumns,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";
export type Props = {
  values: API.InterfaceInfo;
  // 需要返回的列，根据后端写好的接口信息
  columns: ProColumns<API.InterfaceInfo>[];
  // 点击取消
  onCancel: () => void;
  // 点击提交
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  // 是否可见
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const formRef=useRef<ProFormInstance>()
  // 要求传入的参数
  const {values, visible, columns, onCancel , onSubmit } = props;
  // 监听values的变化，如果用initialvalues，他只会初始化一次
  useEffect( ()=>{
    if( formRef ){
      formRef.current?.setFieldsValue(values);
    }
  },[values])
  // 绑定事件
  return <Modal visible={ visible } footer={null} onCancel={()=>onCancel?.()}>
    {/*antdesignpro自己封装好的表格函数，我们只需要去传入后端写入的信息*/}
    <ProTable type="form"
              formRef={ formRef }
              columns={ columns }
    onSubmit={async (value)=>{
      // 用户点击提交，向后端发送请求
      onSubmit?.(value);

    }}/>
    </Modal>;

};
export default UpdateModal;
