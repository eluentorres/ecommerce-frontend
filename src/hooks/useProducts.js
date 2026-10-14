import { useState, useEffect } from "react";
import { getProducts } from "../api/products";

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      try {
        const products = await getProducts();

        if (active) {
          setData(products);
        }
      } catch (err) {
        if (active) {
          setError("No se pudieron cargar los productos");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}