import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from '../RelatedProducts';
import ItemContainer from '../ItemContainer/ItemContainers';
import { fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../../../sharedComponents/customButton/CustomButton'
import mockAxios from 'jest-mock-axios';

describe('RelatedProducts component', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  const mockData = {
    data: {
      results: [{ 'default?': true, name: 'Mock  Mock Mock' }]
    }
  };



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
    features: [
      { feature: 'Fabric', value: 'Canvas' },
      { feature: 'Buttons', value: 'Brass' }
    ]
  };

  const clickedItem = {
    id: 40350,
    campus: 'hr-rfp',
    name: 'Blues Suede Shoes',
    slogan: '2019 Stanley Cup Limited Edition',
    description: 'Touch down in the land of the Delta Blues in the middle of the pouring rain',
    category: 'Dress Shoes',
    default_price: '120.00',
    created_at: '2021-08-13T14:38:44.509Z',
    updated_at: '2021-08-13T14:38:44.509Z',
    features: [
      { feature: 'Sole', value: 'Rubber' },
      { feature: 'Material', value: 'FullControlSkin' },
      { feature: 'Stitching', value: 'Double Stitch' }
    ]
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


  const removeButton = screen.getByTestId(`remove-${trialItem.id}`); 
  fireEvent.click(removeButton);
  await waitFor(() => {
    expect(screen.queryByText('Camo Onesie')).not.toBeInTheDocument();
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

  test('displays related products with names, categories, and prices', async () => {
    // Mock data for related products
    const relatedProductsMockData = [
      
      {
        "id": 40345,
        "campus": "hr-rfp",
        "name": "Bright Future Sunglasses",
        "category": "Accessories",
        "default_price": "69.00",
      }, {
        "id": 40346,
        "campus": "hr-rfp",
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": "40.00",
      }, {
        "id": 40351,
        "campus": "hr-rfp",
        "name": "YEasy 350",
        "slogan": "Just jumped over jumpman",
        "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
        "category": "Kicks",
        "default_price": "450.00",
      }, {
        "id": 40350,
        "campus": "hr-rfp",
        "name": "Blues Suede Shoes",
        "slogan": "2019 Stanley Cup Limited Edition",
        "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
        "category": "Dress Shoes",
        "default_price": "120.00",
      }]; 

      mockAxios.get.mockResolvedValueOnce({ data: relatedProductsMockData });

      render(<RelatedProducts currentItem={trialItem} />);


      await waitFor(() => {
        relatedProductsMockData.forEach(product => {
          expect(getByText(product.name)).toBeInTheDocument();
          expect(getByText(product.category)).toBeInTheDocument();
          expect(getByText(`$${product.default_price}`)).toBeInTheDocument();
        });
      });

    


});



}); 


// describe('shared components', () => {
//   test('renders a customized button', () => {
//     const text = "testing123";
//     const width = '450px';
    
//     render(<CustomButton text={text} Icon={CloseIcon} buttonWidth={width} />);

//     const button = screen.getByRole('button', { name: text });
//     expect(button).toBeInTheDocument();
//     expect(button).toHaveStyle(`width: ${width}`);
//     expect(button.querySelector('svg')).toBeInTheDocument();
//   })

//   test('renders with an icon', () => {
//     render(<CustomButton text="Icon Button" Icon={CloseIcon} />);
//     const icon = screen.getByTestId('CloseIcon'); 
    
//     const svgElement = screen.getByRole('button', { name: "Icon Button" }).querySelector('svg');  });
// }); 




