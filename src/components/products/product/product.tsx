import type { ProductType } from '../../../type';

export interface ProductProps {
  product: ProductType;
  quantity: number;
  onAddToCart: (product: ProductType) => void;
  onRemoveOneFromCart: (productId: number) => void;
}

export default function Product({ product, quantity, onAddToCart, onRemoveOneFromCart }: ProductProps) {
  return (
    <div className="relative flex flex-col w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <span className="absolute top-3 right-3 bg-gray-900 text-white text-[0.7rem] font-semibold px-2.5 py-1 rounded-full capitalize z-10 shadow-sm">
        {product.category}
      </span>

      {/* Product Image Wrapper */}
      <div className="h-52 md:h-56 w-full pt-8 px-6 pb-4 bg-white flex items-center justify-center box-border">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col grow">
        <h3
          className="text-base font-semibold text-gray-800 m-0 mb-2 line-clamp-2 overflow-hidden leading-[1.4]"
          title={product.title}
        >
          {product.title}
        </h3>

        <p className="text-xs sm:text-[0.825rem] text-gray-500 m-0 mb-5 line-clamp-2 overflow-hidden leading-[1.4] grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2 gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>

          <div>
            {quantity === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm active:scale-95"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-300">
                <button
                  onClick={() => onRemoveOneFromCart(product.id)}
                  className="w-7 h-7 bg-white text-gray-800 font-bold rounded flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-colors active:scale-90"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold text-emerald-700">{quantity} in Cart</span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-7 h-7 bg-white text-gray-800 font-bold rounded flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors active:scale-90"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
