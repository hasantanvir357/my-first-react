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
      {/* Category Badge */}
      <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-gray-900 text-white text-[0.65rem] sm:text-[0.7rem] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full capitalize z-10 shadow-sm">
        {product.category}
      </span>

      {/* Product Image Wrapper */}
      <div className="h-44 sm:h-52 md:h-56 w-full pt-6 sm:pt-8 px-4 sm:px-6 pb-3 sm:pb-4 bg-white flex items-center justify-center box-border">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col grow">
        <h3
          className="text-sm sm:text-base font-semibold text-gray-800 m-0 mb-1.5 sm:mb-2 line-clamp-2 overflow-hidden leading-[1.4]"
          title={product.title}
        >
          {product.title}
        </h3>

        <p className="text-xs sm:text-[0.825rem] text-gray-500 m-0 mb-4 sm:mb-5 line-clamp-2 overflow-hidden leading-[1.4] grow">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-2 gap-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">${product.price}</span>

          <div>
            {quantity === 0 ? (
              <button
                onClick={() => onAddToCart(product)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 sm:p-1 border border-gray-300">
                <button
                  onClick={() => onRemoveOneFromCart(product.id)}
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-gray-800 font-bold rounded flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-colors active:scale-90 text-xs sm:text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-1.5 sm:px-2.5 text-xs sm:text-sm font-semibold text-emerald-700 whitespace-nowrap">
                  {quantity} <span className="hidden min-[380px]:inline">in Cart</span>
                </span>
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-gray-800 font-bold rounded flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors active:scale-90 text-xs sm:text-sm"
                  aria-label="Increase quantity"
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
