
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage, GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';

import { ShopLayout } from '../../components/layout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui/ItemCounter';
import { IProduct } from '../../../interfaces';
import { dbProducts } from '../../../database';

interface Props {
  product: IProduct;
}


const ProductPage: NextPage<Props> = ({ product }) => {

  // const route = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${route.query.slug}`)


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titulos */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={ product.sizes[2] } 
                sizes={product.sizes}
              />
            </Box>


            {/* Agregar al carrito */}
            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No hay disponibles" color="error" variant='outlined' /> */}

            {/* Descripción */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}



/*
//del contexto saco los parametros
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  //si el producto no existe lo redirecciono a la home
  if (!product) {
    return {
      redirect: {
        destination: '/',
        //esto hace que sea permanente el redirect
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}
*/
//esto hace que se genere una pagina por cada producto que exista
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs();


  return {
    //aca le paso un array de objetos con los parametros de cada pagina, los path es la cantidad de paginas que se van a generar
    paths: productSlugs.map(({ slug }) => ({
      //los params son los parametros que se le pasan a la pagina
      params: {
        //le pongo el nombre del slug para que sepa que parametro es
        slug
      }
    })),
    //esto hace que se almacene en cache la pagina
    fallback: 'blocking'
  }
}



export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  //si no existe el producto lo redirecciono a la home y no puede volver a atras
  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    //para que la pagina se revilide cada 24hs en el servidor
    revalidate: 60 * 60 * 24
  }
}


export default ProductPage