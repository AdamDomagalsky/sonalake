# Sonalake front-end developer recruitment task

The provided app is built using [angular-cli](https://github.com/angular/angular-cli). See its documentation for more details. Your job is to implement a set of tasks listed in the Tasks section. Feel free to use all included libraries.

Useful npm scripts:
```bash
npm start # run the app using webpack-dev-server
npm run api # start the json-server
npm run lint # lint the code using es-lint
npm test # run the unit tests
npm run e2e # run the e2e tests
```

## General rules
* write clean, reusable, testable code, avoid (extract) side effects
* make sure it works on the latest versions of chrome and firefox

## Tasks

### Refactoring
Refactor the existing code to extract single-purpose, reusable components. Connect ui to the api served by json-server ([http://localhost:3000/characters](http://localhost:3000/characters)). You can start the api by running `npm run api` command. Documentation for json-server can be found on its [github page](https://github.com/typicode/json-server).

### Pagination [DONE]
As a user I want to be able to change currenly visible page of results by using pagination buttons.
* [x] Results should be displayed in pages of 10.
* [x] Clicking on a page button should change currently visible page to the one selected.
* [x] Previous and Next buttons are present and working. Previous button should be disabled when the first page is selected. Next button should be disabled when the last page is selected.

### Searching [DONE]
As a user I want to filter results by using the search box above the data grid.
* [x] Searching should use the [full-text search api endpoint](https://github.com/typicode/json-server#full-text-search).
* [x] When there are no results matching the current query a "No Results Found" message is shown.
* [x] Search requests to API are debounced by 200 ms.
* [x] A regular list of items is shown when the search query input is empty.

### New entity form [DONE]
As a user I want to be able to add new characters by using a new form.
* [x] A new Add Character route should be added.
* [x] Clicking on Add Character button on the List View should navigate to the new route.
* [x] Form should consist of the following form fields:
  * [x] Name - text input, required
  * [x] Species - select input, required, options from [/species](http://localhost:3000/species) api
  * [x] Gender - radio input, required
    * [x] value: male, label: Male
    * [x] value: female, label: Female
    * [x] value: n/a, label: n/a
  * [x] Homeworld - text input, optional
* [x] Required form fields should be marked by a blue * next to their label.
* [x] Relevant error messages should be displayed for form controls with validation errors:
  * required - This field is required.
* [x] Invalid form fields should be styled using `.is-invalid` css class. A field should be styled as invalid only if it is invald and form field has been touched or user has tried to submit an invalid form. Similiar logic should be applied to the visibility of error messages - an error message should be displayed only if a form field is styled as invalid.
* [x] Add Character form submit button should only be disabled when the request creating a new item is in progress.
* [x] If a user tries to submit the form but the form is invalid, the top-most invalid form field should get focused.
* [x] Submitting a valid form should send a POST request to ([http://localhost:3000/characters](http://localhost:3000/characters)).
* [x] Successfully creating a new item should navigate the user to the main list view.

## Bonus Tasks (implement only if you want to)
* [x] Add working Delete button for each item.
* [ ] Add working Edit button for each item.
* [ ] Add sorting by clicking on the data grid row headers.
