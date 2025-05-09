import React, { createContext, useContext, useState, useEffect  } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  // Giỏ hàng ban đầu là một mảng trống


   // Load cart from localStorage when the app initializes
   useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Lấy giỏ hàng từ localStorage
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      const existingProduct = storedCart.find((item) => item.id === product.id);
  
      let updatedCart;
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng của sản phẩm từ localStorage
        updatedCart = storedCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm vào giỏ hàng
        updatedCart = [...storedCart, product];
      }
  
      // Lưu giỏ hàng mới vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id, type) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item => {
        if (item.id === id) {
          const updatedQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
          item.quantity = updatedQuantity > 0 ? updatedQuantity : 1; // Đảm bảo số lượng >= 1
        }
        return item;
      });
      return updatedCart;
    });
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id) => {
    setCart(prevCart => {
      // Lọc ra các sản phẩm không bị xóa
      const updatedCart = prevCart.filter(item => item.id !== id);
  
      // Lưu giỏ hàng đã thay đổi vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  
      return updatedCart;  // Trả về giỏ hàng đã thay đổi
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
