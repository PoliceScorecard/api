module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        activated: true,
        username: 'admin',
        password: '$2a$08$OVrWutoBCqIH2MB6HFyrguwBjy5V8oGR8pUagTsxa5ZBTkXIk2rkG',
        email: 'hello@policescorecard.org',
        first_name: 'Police',
        last_name: 'Scorecard',
        company_name: 'Police Scorecard',
        profile_name: 'Police Scorecard',
        profile_photo: 'https://cdn.policescorecard.org/common/icon.jpg',
        location: 'United States',
        profile_link_website: 'https://policescorecard.org',
        bio: 'Accountability in Action',
        created_date: new Date(),
        modified_date: new Date()
      }
    ], {
      updateOnDuplicate: ['activated', 'username', 'password', 'email', 'first_name', 'last_name', 'company_name', 'profile_name', 'profile_photo', 'location', 'profile_link_website', 'bio', 'modified_date']
    }).catch((err) => {
      if (err && err.errors) {
        for (let i = 0; i < err.errors.length; i++) {
          console.error(`\n× SEED ERROR: ${err.errors[i].type} ${err.errors[i].message} ${err.errors[i].path} ${err.errors[i].value}\n`)
        }
      } else if (err && err.message) {
        console.error(`\n× SEED ERROR: ${err.message}\n`)
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
