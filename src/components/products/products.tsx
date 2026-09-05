import { use, useState } from 'react';
import './products.css';
import Product from './product/product';
import type { ProductType } from '../../type';

export interface ProductsProps {
  productsPromise: Promise<ProductType[]>;
}

export interface CartItem {
  product: ProductType;
  quantity: number;
}

export default function Products({ productsPromise }: ProductsProps) {
  const products = use(productsPromise);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: ProductType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const handleRemoveOneFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.product.id !== productId);
      }
    });
  };

  const handleResetCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Cart Items: <span className="text-blue-600">{totalCartCount}</span>
        </h1>
        {cart.length > 0 && (
          <button
            onClick={handleResetCart}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Reset Cart
          </button>
        )}
      </div>

      <div className="grid-container">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.product.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <Product
              key={product.id}
              product={product}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onRemoveOneFromCart={handleRemoveOneFromCart}
            />
          );
        })}
      </div>
    </div>
  );
}
