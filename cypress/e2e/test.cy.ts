describe('Настроен перехват запроса на эндпоинт "api/ingredients"', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients'
    });
    cy.visit('http://localhost:5173/');
  });
  describe('тесты страницы сбора бургера', () => {
    it('проверка добавления одного ингредиента при нажатии на кнопку', () => {
      cy.contains('li', 'Краторная булка').find('button').click();
      cy.contains('span', 'Краторная булка').should('exist');
    });

    it('проверка добавления нескольких ингредиентов при нажатии на кнопку', () => {
      cy.contains('li', 'Флюоресцентная булка').find('button').click();

      cy.contains('div', 'Начинки').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
        .find('button')
        .click();
      cy.contains('li', 'Плоды Фалленианского дерева').find('button').click();

      cy.contains('div', 'Соусы').click();
      cy.contains('li', 'Соус фирменный Space Sauce').find('button').click();

      cy.contains('span', 'Флюоресцентная булка');
      cy.contains('span', 'Биокотлета из марсианской Магнолии');
      cy.contains('span', 'Филе Люминесцентного тетраодонтимформа');
      cy.contains('span', 'Плоды Фалленианского дерева');
      cy.contains('span', 'Соус фирменный Space Sauce');
    });

    it('проверка смены булки при выборе другой', () => {
      cy.contains('li', 'Краторная булка').find('button').click();
      cy.contains('li', 'Флюоресцентная булка').find('button').click();

      cy.contains('span', 'Флюоресцентная булка');
      cy.contains('span', 'Краторная булка').should('not.exist');
    });
  });

  describe('тесты работы модальных окон', () => {
    it('проверка открытия модального окна ингредиента', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии').click();

      const modal = cy.get(`[data-cy=modal]`);
      modal.should('exist');

      const close = cy.get(`[data-cy=modal-close]`);
      close.should('exist');

      modal.contains('h3', 'Детали ингредиента');
      cy.contains('p', 'Биокотлета из марсианской Магнолии');
    });

    it('проверка закрытия модального окна ингредиента по клику', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии').click();

      const modal = cy.get(`[data-cy=modal]`);
      modal.should('exist');

      const close = cy.get(`[data-cy=modal-close]`);
      close.should('exist');

      modal.contains('h3', 'Детали ингредиента');

      close.click();
      modal.should('not.exist');
    });

    it('проверка закрытия модального окна ингредиента при нажатии esc', () => {
      cy.contains('li', 'Биокотлета из марсианской Магнолии').click();

      const modal = cy.get(`[data-cy=modal]`);
      modal.should('exist');

      cy.get('body').type('{esc}');

      cy.get(`[data-cy=modal]`).should('not.exist');
    });
  });

  describe('тесты на создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
        fixture: 'user.json'
      });

      cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
        fixture: 'order.json'
      }).as('createOrder');

      cy.setCookie('token', 'token');
      window.localStorage.setItem('token', 'token');
    });

    it('создание заказа', () => {
      cy.contains('li', 'Краторная булка').find('button').click();

      cy.contains('div', 'Начинки').click();
      cy.contains('li', 'Биокотлета из марсианской Магнолии')
        .find('button')
        .click();
      cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
        .find('button')
        .click();
      cy.contains('li', 'Плоды Фалленианского дерева').find('button').click();

      cy.contains('div', 'Соусы').click();
      cy.contains('li', 'Соус фирменный Space Sauce').find('button').click();

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@createOrder');

      const modal = cy.get(`[data-cy=modal]`);
      modal.should('exist');
      const close = cy.get(`[data-cy=modal-close]`);
      close.should('exist');

      cy.contains('p', 'идентификатор заказа');
      cy.contains('p', 'Ваш заказ начали готовить');
      cy.contains('h2', '60229').should('exist');

      close.click();
      cy.contains('p', 'идентификатор заказа').should('not.exist');
      cy.contains('p', 'Ваш заказ начали готовить').should('not.exist');
      cy.contains('h2', '60229').should('not.exist');
    });

    afterEach(() => {
      cy.clearCookie('token');
      window.localStorage.removeItem('token');
    });
  });
});
