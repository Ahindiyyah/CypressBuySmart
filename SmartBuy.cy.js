/// <reference types="cypress" />

function getRandomCompany() {
    const companies = ['iphone', 'samsung', 'huawei'];
    const randomIndex = Math.floor(Math.random() * companies.length);
    return companies[randomIndex];
  }
  
  function selectRandomCompanyAndAddToCart() {
    const randomCompany = getRandomCompany();
    cy.get('#search-icon > .fal').click();
    cy.get('.float-left > .search-style-100 > .site-search > .yCmsComponent > div.ui-front > form > .input-group > #js-site-search-input').type(randomCompany);
    cy.get('.ui-menu-item').first().click({ force: true });
    if (randomCompany === 'iphone') {
      cy.get(':nth-child(1) > .product-item-data > .mainproduct_div').click();
    }
    cy.get('#addToCartButton').click();
    cy.get('.headline-text').should('contain.text', 'Item added to Cart');
    cy.get('#addToCartLayer > .btn-primary').click();
  }
  
  function verifyCartTotal() {
    cy.get('.col-xs-6.cart-totals-right.text-right.grand-total').invoke('text').then((finalItemPrice) => {
      finalItemPrice = finalItemPrice.trim();
      cy.get('.cart__top--amount').invoke('text').then((cartTopAmount) => {
        cartTopAmount = cartTopAmount.trim();
        expect(cartTopAmount).to.equal(finalItemPrice);
      });
    });
  }
  
  describe('Just A Test', () => {
    it('ChoosingRandomCompanyAndAddingItem', () => {
      cy.visit('https://smartbuy-me.com/smartbuystore/en/');
      cy.get('#cboxLoadedContent > .content > :nth-child(3) > .close-popups').click();
  
      selectRandomCompanyAndAddToCart();
      verifyCartTotal();
    });
  });
  