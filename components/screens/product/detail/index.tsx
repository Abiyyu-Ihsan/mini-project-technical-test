import LayoutDashboardView from '@components/layouts/LayoutMain'
import { useProductBySlug } from '@libs/services/DetailProduct';
import { useParams } from 'next/navigation';
import React from 'react'
import SectionHeadProductDetailScreen from './SectionHeadProductDetailScreen';
import SectionSpesifikasi from './SectionSpesifikasi';
import SectionDeskripsiDetail from './SectionDeskripsiDetail';

export default function DetailProductScreen() {
    const params = useParams();
    const slug = params?.slug as string;

    const { data: product } = useProductBySlug(slug);

    
    return (
        <LayoutDashboardView>
            <SectionHeadProductDetailScreen data={product} />
            <SectionSpesifikasi data={product} />
            <SectionDeskripsiDetail data={product} />
        </LayoutDashboardView>
    )
}
