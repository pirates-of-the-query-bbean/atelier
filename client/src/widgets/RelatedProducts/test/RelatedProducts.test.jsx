import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from '../RelatedProducts';
import ItemContainer from '../ItemContainer/ItemContainers';
import { fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../../sharedComponents/customButton/CustomButton'

describe('RelatedProducts component', () => {
  const trialItem = {
    id: 40344,
    campus: 'hr-rfp',
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
  };

test('renders RelatedProducts.jsx when passed an item', () => {
    render(<RelatedProducts currentItem={trialItem} />);
    const relatedProductsWidget = screen.getByTestId('related-products');
    expect(relatedProductsWidget).toBeInTheDocument();
});

test('adds a new outfit card when AddOutfitCard is clicked', async () => {
    render(<RelatedProducts currentItem={trialItem} />);
    const addButton = screen.getByTestId('addOutfitCard');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Camo Onesie')).toBeInTheDocument();
    });
});

test('adds item card containers when the page loads', async () => {
    render(<RelatedProducts currentItem={trialItem} />);
    await waitFor(() => {
      const itemCardContainers = screen.getAllByTestId('itemCardContainers');
      expect(itemCardContainers.length).toBeGreaterThan(0);
    });
  });

  test('renders correctly with given item', async () => {
    const mockDataTestId = 'item-container';

    render(
      <ItemContainer 
        item={trialItem} 
        dataTestId={mockDataTestId} 
        Icon={CloseIcon}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(trialItem.name)).toBeInTheDocument();
      expect(screen.getByText(`$${trialItem.default_price}`)).toBeInTheDocument();
      expect(screen.getByText(trialItem.category)).toBeInTheDocument();
    });
  });
});


describe('shared components', () => {
  test('renders a customized button', () => {
    const text = "testing123";
    const width = '450px';
    
    render(<CustomButton text={text} Icon={CloseIcon} buttonWidth={width} />);

    const button = screen.getByRole('button', { name: text });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle(`width: ${width}`);
    expect(button.querySelector('svg')).toBeInTheDocument();
  })

  test('renders with an icon', () => {
    render(<CustomButton text="Icon Button" Icon={CloseIcon} />);
    const icon = screen.getByTestId('CloseIcon'); 
    
    const svgElement = screen.getByRole('button', { name: "Icon Button" }).querySelector('svg');  });
}); 
