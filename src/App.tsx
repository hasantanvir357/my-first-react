import { Suspense } from 'react';
import './App.css';
import type { ProductType } from './type';
import Products from './components/products/products';

const productsPromise = async (): Promise<ProductType[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = res.json();
  return data;
};

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Products productsPromise={productsPromise()} />
    </Suspense>
  );
}

export default App;
