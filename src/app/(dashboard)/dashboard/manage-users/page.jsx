"use client"

import { allUsers } from "@/components/redux/user/userSlice";
import { Space, Table, Tag } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
    const allUser = useSelector(state => state?.userReducer?.allUsers)
    const dispatch = useDispatch();

    console.log('allo aldfoisuoisd user  ', allUser)

    useEffect(()=>{
        dispatch(allUsers(''))
    },[dispatch])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a>Invite {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <div>
            <div className="">
                <h1 className="text-4xl my-3 mx-3">Manage Users . </h1>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default page;