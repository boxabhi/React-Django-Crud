
import './App.css';
import React, { useState ,useEffect} from 'react';
import { Avatar, List, Card ,Row, Col,Tooltip, message } from 'antd';

import RecipeFormModal from './components/RecipeFormModal';
import axios from 'axios'; 





function App() {
  const [recipes, setRecipes] = useState([]);
  
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/receipes/');
      console.log(response?.data?.data)
      setRecipes(response?.data?.data); // Assuming the response data is the list of recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
      message.error('Failed to fetch recipes. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);


  return (
    <div style={{ backgroundColor: '#f0f0f0',paddingTop:150, paddingBottom:300}}>
    <Row justify="center" >
      
  <Col xs={24} sm={12} md={8} lg={6}>
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', paddingBottom: '20px' }}>
  <RecipeFormModal fetchData={fetchRecipes}  />
       
      </div>
 
 
    <Card>
  
      <List
        itemLayout="horizontal"
        dataSource={recipes}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Tooltip title={item.ingredients.map(ingredient => ingredient.ingredient_name).join(', ')}>
              <Avatar src={`http://127.0.0.1:8000/${item.receipe_image}`} />
              </Tooltip>
              }
              title={
                <Tooltip title={`Title Tooltip for ${item.receipe_name}`}>
                  <a href="https://ant.design">{item.receipe_name}</a>
                </Tooltip>
              }
              description={item.receipe_description}
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
