import { useState, useEffect } from 'react';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, Chip } from '@mui/material';
import { fetchCreateOrder } from '@/utils/orderActions';

import styles from '../styles/productForm.module.css';

function OrderForm({products, handleOpen, handleGetOrders}: handleOrderFormActions) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  
  const [errorMsg, setErrorMsg] = useState<string>("");
	

  const handleChange = (event: any) => {
    setSelectedProducts(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); 

    const tokenData = localStorage.getItem('token');
    if (tokenData) {
        try{
        const response = await fetchCreateOrder(tokenData, selectedProducts);
        if (response.order?.id) {
            handleOpen(false);
            handleGetOrders(tokenData);
        } else {
            setErrorMsg('Failed to create order. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMsg('An error occurred. Please try again.');
    }
    } else {
        setErrorMsg('No authentication token found. Please log in.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="products-select-label">Products</InputLabel>
        <Select
          labelId="products-select-label"
          id="products-select"
          multiple
          value={selectedProducts}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={products.find(product => product.id === value)?.title || value} />
              ))}
            </Box>
          )}
        >
          {products.map((product) => (
            <MenuItem
              key={product.id}
              value={product.id}
            >
              {product.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 0 }}
      >
        Create Order
      </Button>
      {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
    </Box>
  );
}

export default OrderForm;