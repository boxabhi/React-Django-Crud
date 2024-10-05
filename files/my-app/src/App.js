import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Avatar, List,Modal  } from 'antd';
import { Button, Flex, Segmented,Card ,Row, Col,Tooltip } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import RecipeFormModal from './components/RecipeFormModal';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0',paddingTop:150, paddingBottom:300}}>
    <Row justify="center" >
      
  <Col xs={24} sm={12} md={8} lg={6}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingBottom: '20px' }}>
  <RecipeFormModal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}/>
       
      </div>
 
 
    <Card>
  
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={`Avatar Tooltip for ${item.title}`}>
              <Avatar src={`https://www.whiskaffair.com/wp-content/uploads/2021/01/Chicken-Masala-2-3-1.jpg`} />
              </Tooltip>
              }
              title={
                <Tooltip title={`Title Tooltip for ${item.title}`}>
                  <a href="https://ant.design">{item.title}</a>
                </Tooltip>
              }
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    
    </Card>
  
    </Col>
    </Row>
    </div>
  );
}

export default App;
