import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const RecipeFormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([{ key: '', value: '' }]);

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
        <Form layout="vertical">
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

          {/* Recipe Type (Veg/Non-Veg) */}
          <Form.Item
            label="Recipe Type"
            name="recipe_type"
            rules={[{ required: true, message: 'Please select recipe type' }]}
          >
            <Select placeholder="Select recipe type">
              <Option value="veg">Veg</Option>
              <Option value="non-veg">Non-Veg</Option>
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
