import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';



const KidPage: NextPage = () => {

    //este hook es para traer los productos de la base de datos y lo puedo reutilizar en cualquier pagina
    const { product, isLoading } = useProducts('/products?gender=kid')


    return (
        <ShopLayout title={'Teslo-Shop - KID'} pageDescription={'Encuentra los mejores productos para los pendejos culiaos'}>
            <Typography variant='h1' component='h1'>Tienda</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={product} />
            }



        </ShopLayout>
    )
}

export default KidPage