import { Box, Grid, Pagination, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import Product from "../components/Product";
import { fetchProductIdsApi } from "../util/api";

export default function Products() {
  const queryRef = useRef('');

  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(0);

  const handleFetchProdcuts = async () => {
    const res = await fetchProductIdsApi(queryRef.current);
    
    setProducts([...res]);
    setPage(0);
  };

  const handleUpdateQuery = (e: any) => {
    const value = e.target.value;
    queryRef.current = value;
    handleFetchProdcuts();
  }

  const debouncedSearch = useCallback(
    debounce(handleUpdateQuery, 200)
  , [])

  useEffect(() => {
    handleFetchProdcuts();
  }, []);

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  }

  return (
    <Box sx={{ width: '100vw', p: 2 }}>
      <Box my={2}>
        <TextField
          label="Query"
          placeholder="Search gallery"
          variant="outlined"
          fullWidth
          onChange={debouncedSearch}
        />
      </Box>
      
      {products.length > 10 && (
        <Pagination count={Math.ceil(products.length / 10)} sx={{ my: 2 }} onChange={handlePageChange} />
      )}

      {products.length > 0 ? (
        <Grid container spacing={2} sx={{ flexWrap: 'wrap' }}>
          {products.slice(page * 10 , (page + 1) * 10).map((product) => (
            <Product key={product.objectID} product={product} />
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" my={4} textAlign="center">
          There are no gallery images
        </Typography>
      )}
    </Box>
  )
}
