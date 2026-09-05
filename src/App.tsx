import { Suspense, useState } from 'react';
import './App.css';
import type { ProductType } from './type';
import Products from './components/products/products';

const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
};

const productsPromise = fetchProducts();

function App() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (product: ProductType) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleRemoveOneFromCart = (productId: number) => {
    setCart((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return { ...prev, [productId]: currentQty - 1 };
    });
  };

  const handleResetCart = () => {
    setCart({});
  };

  const totalCartItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <div>
      {/* Header with Cart Counter & Reset Button */}
      <header className="bg-white shadow-sm py-4 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">My Shop</h1>

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            Cart Items: {totalCartItems}
          </div>

          {/* Reset Button  */}
          {totalCartItems > 0 && (
            <button
              onClick={handleResetCart}
              className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm active:scale-95"
            >
              Reset Cart
            </button>
          )}
        </div>
      </header>

      <Suspense fallback={<h1 className="text-center mt-10">Loading...</h1>}>
        <Products
          productsPromise={productsPromise}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveOneFromCart={handleRemoveOneFromCart}
        />
      </Suspense>
    </div>
  );
}

export default App;
