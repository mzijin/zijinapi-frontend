import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {
  getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,
} from "@/services/zijinapi-backend/interfaceInfoController";
import {Button, Card, Descriptions, Divider, Form, Input, message } from "antd";
import {useParams} from "react-router";



/**
 * 查看接口信息详情
 * @constructor
 */
const Index: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [invokeloading, setInvokeLoading] = useState(false);
  // 拿到接口信息的数据
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] =useState<any>()
  const Params = useParams();
  const loaddata = async () =>{
    if(!Params.id){
      message.error("请求的参数不存在")
      return;
    }
    // 请求前默认在加载
    setLoading(true)
    try {
      const res=await getInterfaceInfoByIdUsingGET({
        id: Number(Params.id)
      });
      // 如果不存在，就返回空数组
      setData(res.data)
    } catch (error: any) {
      message.error('请求失败'+error.message);

    }
    // 请求结束后，加载完成
    setLoading(false)

  }
  useEffect(()=>{
   loaddata();
  },[])
  const onFinish = async (values: any) => {
    if(!Params.id){
      message.error("接口不存在")
      return;
    }
    setInvokeLoading(true)
    try {
      const res=await invokeInterfaceInfoUsingPOST({
        id: Params.id,
        ...values,
      });
      setInvokeRes(res.data)
      message.success("请求成功");

    } catch (error: any) {
      message.error('请求失败'+error.message);
    }
    setInvokeLoading(false)
  };
  return (
    <PageContainer title="查看接口文档">
      <Card>
        {
          data ?(
            <Descriptions title={data.name} column={1}>
              <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
              <Descriptions.Item label="接口描述">{data.description}</Descriptions.Item>
              <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
              <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
              <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
              <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
              <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
            </Descriptions>
          )  :(
            <>接口不存在</>
          )
        }
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{span: 16}}>
          <Button type="primary" htmlType="submit">
            调用
          </Button>
        </Form.Item>
        </Form>
      </Card>
      <Card title="结果 " loading={invokeloading}>

        <Divider />
        {invokeRes}
      </Card>
    </PageContainer>
  );


};


export default Index;
