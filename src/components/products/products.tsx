import { use } from 'react';
import type { ProductType } from '../../type';
import Product from './product/product';

interface ProductsProps {
  productsPromise: Promise<ProductType[]>;
  cart: { [key: number]: number };
  onAddToCart: (product: ProductType) => void;
  onRemoveOneFromCart: (productId: number) => void;
}

export default function Products({ productsPromise, cart, onAddToCart, onRemoveOneFromCart }: ProductsProps) {
  const products = use(productsPromise);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            onAddToCart={onAddToCart}
            onRemoveOneFromCart={onRemoveOneFromCart}
          />
        ))}
      </div>
    </div>
  );
}
