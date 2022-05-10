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

    cy.wait(1000)

    // open wallet
    cy.contains('My Monero Wallet').click()
    // check that there is no transactions yet
    cy.contains("You don't have any")
    // open secret key info window
    cy.get('.keys_dropdown_toggle').click()
    // check secret info is correctly displayed
    cy.contains('58djRYSRNxaLgscUijPbagh3GyMTaU993hwDwcYBNR4oHg8SC3nujWPAEGZiFAj6BuUK6CxMbR3175MFWJ3Czg7JG3bSuHk')
    cy.contains('bb38c2cfe9a5514b0402d72c5f1e042740378cb0310265047258abc580da120b')
    cy.contains('6e7628f37dcf8b77b8bcd51e376415b639903660b76c7de0d0b7c591391be802')
    cy.contains('whale wiggle utmost unplugs long wickets input azure dogs satin dice upbeat using junk tagged pager dapper aphid eavesdrop entrance symptoms efficient puddle radar pager')
    // close secret key info window
    // cy.get('.keys_dropdown_toggle').click()
    cy.get('.back_button').click()
    // send page
    cy.get('.tabButton-send').click()

    cy.contains('FROM')
    // fund request page
    cy.get('.tabButton-fundRequest').click()

    cy.contains('To make Monero Requests,')
    // contacts page
    cy.get('.tabButton-contacts').click()

    cy.contains('To create Contacts,')
    // exchange page
    cy.get('.tabButton-exchange').click()

    cy.contains('Exchange')
    // settings page
    cy.get('.tabButton-settings').click()

    cy.contains('ABOUT MYMONERO').click()

    cy.contains('View on GitHub')

    cy.contains('Close').click()

    cy.contains('LOG OUT').click()

    cy.contains('Use existing wallet').click()

    cy.contains('Address and Private Keys').click()

    cy.get('.address')
      .type('58djRYSRNxaLgscUijPbagh3GyMTaU993hwDwcYBNR4oHg8SC3nujWPAEGZiFAj6BuUK6CxMbR3175MFWJ3Czg7JG3bSuHk')
      .should('have.value', '58djRYSRNxaLgscUijPbagh3GyMTaU993hwDwcYBNR4oHg8SC3nujWPAEGZiFAj6BuUK6CxMbR3175MFWJ3Czg7JG3bSuHk')

    cy.get('.view_key')
      .type('bb38c2cfe9a5514b0402d72c5f1e042740378cb0310265047258abc580da120b')
      .should('have.value', 'bb38c2cfe9a5514b0402d72c5f1e042740378cb0310265047258abc580da120b')

    cy.get('.spend_key')
      .type('6e7628f37dcf8b77b8bcd51e376415b639903660b76c7de0d0b7c591391be802')
      .should('have.value', '6e7628f37dcf8b77b8bcd51e376415b639903660b76c7de0d0b7c591391be802')

    cy.contains('Next').click()

    cy.contains('My Monero Wallet')

    cy.wait(1000)
  })
})
