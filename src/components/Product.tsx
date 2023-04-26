import { Box, Grid, Link, Typography } from "@mui/material"

interface Props {
  product: any
}

// Image: Artwork image
// ● Artist: Name of the artist
// ● Artist Nationality
// ● Dimensions
// ● Medium: e.g oil on canvas
// ● Tags
// ● On click redirect to the museum URL a.k.a objectURL

export default function Product({ product }: Props) {
  const tags = product.tags ? product.tags.map((tag: any) => tag.term).join(', ') : '';

  const handleProductClick = () => {
    window.open(product.objectURL);
  }

  return (
    <Grid item sm={6} onClick={handleProductClick}>
      <Box sx={{ width: '100%', background: 'gray', p: 2, height: '300px' }}>
        <Box
          component="img"
          src={product.primaryImage || product.primaryImageSmall}
          width="100%"
          loading="lazy"
          alt={product.artistDisplayName}
          sx={{
            objectFit: 'contain',
            maxHeight: '100%',
          }}
        />
      </Box>
      <Box mt={1}>
        <Typography variant="h6">
          {product.artistDisplayName}
        </Typography>
        <Typography variant="body2" my={1}>
          {product.artistNationality}
        </Typography>
        <Typography variant="body2" my={1}>
          {product.dimensions}
        </Typography>
        <Typography variant="body2">
          {product.medium}
        </Typography>
        {tags && (
          <Typography variant="body2">
            {tags}
          </Typography>
        )}
      </Box>
    </Grid>
  )
}
