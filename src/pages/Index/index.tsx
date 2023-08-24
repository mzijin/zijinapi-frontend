import { PageContainer } from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import {
  listInterfaceInfoByPageUsingGET,
} from "@/services/zijinapi-backend/interfaceInfoController";
import List from 'antd/es/list';
import {message} from "antd";



/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total,setTotal] = useState<number>(0);
  const loaddata = async (current = 1,pageSize=5) =>{
    // 请求前默认在加载
    setLoading(true)
    try {
      const res=await listInterfaceInfoByPageUsingGET({
        // 这里要参数传下来，不然页面展示不了全部
        current,pageSize
      });
      // 如果不存在，就返回空数组
      setList(res?.data?.records ?? [])
      //表示0条数据
      setTotal(res?.data?.total ?? 0)
    } catch (error: any) {
      message.error('请求失败'+error.message);

    }
    // 请求结束后，加载完成
    setLoading(false)

  }
  useEffect(()=>{
   loaddata();
  },[])
  return (
    <PageContainer title="数据接口平台">
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) =>
          {
            const apihref=`/Interface_info/${item.id}`;
            return <List.Item
              actions={[<a key={item.id} href={apihref}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apihref}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          }

        }
        pagination={
        {

          pageSize: 5,
          total,
          showTotal(total: number) {
            return "总数：" + total
          },
          onChange(page,pageSize){
            loaddata(page,pageSize);
          },
        }
        }
      />


    </PageContainer>
  );


};


export default Index;
