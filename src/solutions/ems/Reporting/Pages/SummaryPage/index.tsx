import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { t } from '@core/utils/translate';

// styles

import { cn } from '@core/utils/classnames';
import styles from './styles.module.scss';

// components
import { Accordion } from '@core/ui/components/Accordion';
import { AccordionDomain } from '@core/ui/components/AccordionDomain';
import { AccordionGroup } from '@core/ui/components/AccordionGroup';
import { Card } from '@core/ui/components/Card';
import { CardContent } from '@core/ui/components/CardContent';
import { CardHeader } from '@core/ui/components/CardHeader';
import { Grid } from '@core/ui/components/Grid';
import { Icon } from '@core/ui/components/Icon';
import { Scrollbar } from '@core/ui/components/Scrollbar';
import { SegmentedControl } from '@core/ui/components/SegmentedControl';
import { Stack } from '@core/ui/components/Stack';
import { Text } from '@core/ui/components/Text';
import { Unit } from '@core/ui/components/Unit';
import { UnitContainer } from '@core/ui/components/UnitContainer';
import { getPageSwitch } from '../getPageSwitch';
import { UnitList } from './UnitList';

// ICON
import { useUI } from '@core/storages/ui';
import { Avatar } from '@core/ui/components/Avatar';
import { Divider } from '@core/ui/components/Divider';
import { useProducts } from '../../storages/controllers/product';
import ProductData from './ProductData';
import { Button } from '@core/ui/components/Button';
import { set } from '@nodemodules/@types/lodash';

type ProductsType = {
  image: React.ReactNode;
  name: string;
}[];

const SummaryPage = observer(() => {
  const [isCalculating, setIsCalculating] = React.useState(true);
  const pageSwitch = getPageSwitch();
  const [selectedVariant, setSelectedVariant] = React.useState<string>('summary');

  const onSegmentedControlVariantChange = (value: string) => {
    setSelectedVariant(value);
    pageSwitch.toggleLists?.(value);
  };

  const ui = useUI();

  const products = useProducts({
    locationId: ui.currentFormation,
  });

  const list = products.getData();

  const [selectProductId, setselectProductId] = React.useState<number>(0);
  const selectProductHandler = (index: number) => {
    setselectProductId(index);
  };

  useEffect(() => {
    if (list) {
      setselectProductId(list.length ? list[0].productId : 0);
    }
  }, [list]);

  const productRef = useRef(null);

  const handleDownload = async () => {
    const productInfo = productRef.current;
    if (!productInfo) return;
    const canvas = await html2canvas(productInfo, {
      scale: 4,
    });
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [595, 842],
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    const imageWidthScaled = imgWidth * scale;
    const imageHeightScaled = imgHeight * scale;

    const xOffset = (pageWidth - imageWidthScaled) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, 20, imageWidthScaled, imageHeightScaled);
    pdf.save('ems-reporting-summary.pdf');
  };
  const handleCalculating = () => {
    setIsCalculating(false);
  };

  return (
    <>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Stack direction='row' className={styles['stack']}>
            <SegmentedControl
              aria-label='screen selection'
              buttons={pageSwitch.toggleButtons}
              onChange={onSegmentedControlVariantChange}
              value={selectedVariant}
            />
          </Stack>
        </Grid>
        <Grid item>
          <UnitContainer>
            <Unit variant='sidebar' className={cn(styles['summary-unit'], styles['summary-sidebar'])}>
              <Scrollbar>
                <AccordionGroup gap>
                  <Accordion
                    key={`summary.sidebar`}
                    customTitle={
                      <Text component='h2' variant='lg' weight='semibold'>
                        {/* Product */}
                        {t('ems.product.label', '', '')}
                      </Text>
                    }
                    disableGutters
                    defaultOpen
                    shadow
                    rounded
                    variant='solid'
                  >
                    {list?.map((item) => {
                      return (
                        <CardContent
                          key={`product.${item.productId}`}
                          className={cn(
                            styles['card-content-text'],
                            item.productId === selectProductId && styles['active'],
                          )}
                          borderTop
                        >
                          <Grid
                            container
                            fullWidth
                            spacing={3}
                            alignItems='center'
                            onClick={() => selectProductHandler(item.productId)}
                            className={styles['product-item']}
                          >
                            <Grid item>
                              <Avatar className={styles['avatar']} size='2xl' stillLife src={item.files?.[0].url} />
                            </Grid>
                            <Grid item>
                              <Text variant='sm' weight={'medium'}>
                                {item.name}
                              </Text>
                            </Grid>
                          </Grid>
                        </CardContent>
                      );
                    })}
                  </Accordion>
                </AccordionGroup>
              </Scrollbar>
            </Unit>
            <div className='relative w-full'>
              <Button
                onClick={handleDownload}
                disabled={isCalculating}
                className='absolute right-8 top-4 z-10 bg-white p-2 rounded-md shadow-md leading-[20px]'
              >
                Download to PDF
              </Button>
              <div ref={productRef}>
                <Unit height='full' className={styles['summary-unit']}>
                  <Grid>
                    <ProductData
                      locationId={ui.currentFormation}
                      productId={selectProductId}
                      handleCalculating={handleCalculating}
                    ></ProductData>
                  </Grid>
                  <Grid container fullWidth spacing={3} direction='column' grow>
                    <Grid item fullHeight>
                      <UnitList key={`unitList.${selectProductId}`} productId={selectProductId}></UnitList>
                    </Grid>
                  </Grid>
                </Unit>
              </div>
            </div>
          </UnitContainer>
        </Grid>
      </Grid>
    </>
  );
});

export default SummaryPage;
