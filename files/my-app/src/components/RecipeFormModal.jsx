import React, { useState } from 'react';
import { Modal, message, Button, Form, Input, Select, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios'; 
const { Option } = Select;

const RecipeFormModal = ({fetchData}) => {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([{ key: '', value: '' }]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Add a new ingredient input
  const addIngredient = () => {
    setIngredients([...ingredients, { key: '', value: '' }]);
  };

  // Remove an ingredient input by index
  const removeIngredient = (index) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };


  const handleSubmit = async (values) => {
    console.log("Submitting form", values);
    // Prepare the data to be sent to the API
    const recipeData = {
      receipe_name: values.recipe_name,
      receipe_description: values.recipe_description,
      receipe_type: values.recipe_type,
      receipe_image: values.recipe_image && values.recipe_image[0]?.originFileObj, // Get the file object for upload
      receipe_ingredents: ingredients.map((ingredient) => ingredient.value).filter(Boolean), // Filter out empty ingredients
    };

    console.log(recipeData)

    const formData = new FormData();
    // Append the fields to the FormData
    for (const key in recipeData) {
      if (Array.isArray(recipeData[key])) {
        recipeData[key].forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, recipeData[key]);
      }
    }

    try {
      // Replace `your-api-endpoint` with your actual API endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/receipes/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });

      if(response?.data?.status === false){
        message.error('Recipe not created!');
        return
      }
      fetchData()
      message.success('Recipe submitted successfully!'); // Show success message
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset form fields
      setIngredients([{ value: '' }]); // Reset ingredients
    } catch (error) {
      console.error('Error submitting recipe:', error);
      message.error('Failed to submit recipe. Please try again.'); // Show error message
    }
  };


  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Add New Recipe"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {/* Recipe Name */}
          <Form.Item
            label="Recipe Name"
            name="recipe_name"
            rules={[{ required: true, message: 'Please enter recipe name' }]}
          >
            <Input placeholder="Enter recipe name" />
          </Form.Item>

          {/* Recipe Description */}
          <Form.Item
            label="Recipe Description"
            name="recipe_description"
            rules={[{ required: true, message: 'Please enter recipe description' }]}
          >
            <Input.TextArea placeholder="Enter recipe description" rows={4} />
          </Form.Item>

         
          <Form.Item
            label="Recipe Type"
            name="recipe_type"
            rules={[{ required: true, message: 'Please select recipe type' }]}
          >
            <Select placeholder="Select recipe type">
              <Option value="Veg">Veg</Option>
              <Option value="Non-Veg">Non-Veg</Option>
            </Select>
          </Form.Item>

          {/* Recipe Image */}
          <Form.Item
            label="Recipe Image"
            name="recipe_image"
            valuePropName="fileList"
            getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload name="image" listType="picture" maxCount={1} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          {/* Dynamic Ingredients */}
          <Form.Item label="Ingredients">
            {ingredients.map((ingredient, index) => (
              <Space key={index} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                <Input
                  placeholder="Enter ingredient"
                  value={ingredient.value}
                  onChange={e => {
                    const updatedIngredients = [...ingredients];
                    updatedIngredients[index].value = e.target.value;
                    setIngredients(updatedIngredients);
                  }}
                />
                {ingredients.length > 1 && (
                  <MinusCircleOutlined
                    onClick={() => removeIngredient(index)}
                    style={{ color: 'red' }}
                  />
                )}
              </Space>
            ))}
            <Button
              type="dashed"
              onClick={addIngredient}
              block
              icon={<PlusOutlined />}
            >
              Add Ingredient
            </Button>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Recipe
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RecipeFormModal;
