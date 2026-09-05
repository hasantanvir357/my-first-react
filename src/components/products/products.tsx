import type { ProductType } from '../../type';
import Product from './product/product';

interface ProductsProps {
  products: ProductType[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            quantity={0}
            onAddToCart={(prod) => console.log('Added:', prod)}
            onRemoveOneFromCart={(id) => console.log('Removed:', id)}
          />
        ))}
      </div>
    </div>
  );
}
