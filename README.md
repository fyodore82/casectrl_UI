# casectrl_UI
This repository contains UI part which is developed with React
To run:
1. Install node_packages with `yarn install`
2. Start by `yarn start`
API URLs are in `.env` file

Unit tests are in src\todo\ToDoList.test.tsx.
To run unit tests: `yarn test`

E2E tests are in cypress\e2e\Login.spec.cy.ts.
To run e2e tests:
1. Ensure that Users API is strted and user with credentials in cypress\fixtures\loginCreds.json is created. Or change credentials in that file
2. Start UI by `yarn start`
3. Run Cypress by either `yarn run cypress open` or by `yarn run cypress run --headless`