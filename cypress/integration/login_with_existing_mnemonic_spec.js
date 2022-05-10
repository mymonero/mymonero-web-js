describe('Login Test', () => {
  it('Logs in to an existing account', () => {
    cy.visit('http://localhost:9110')

    cy.contains('Welcome to MyMonero!')

    cy.contains('Use existing wallet').click()

    cy.contains('SECRET MNEMONIC')

    cy.contains('Next').should('have.class', 'disabled')

    cy.get('.existing_key')
      .type('whale wiggle utmost unplugs long wickets input azure dogs satin dice upbeat using junk tagged pager dapper aphid eavesdrop entrance symptoms efficient puddle radar pager')
      .should('have.value', 'whale wiggle utmost unplugs long wickets input azure dogs satin dice upbeat using junk tagged pager dapper aphid eavesdrop entrance symptoms efficient puddle radar pager')

    cy.contains('Next').click()

    cy.contains('My Monero Wallet')
  })
})
