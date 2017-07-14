This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Play with this project [here](https://lkrych.github.io/form-builder/)

## React Indio Challenge

One of the largest problems in the insurance industry today is the pure amount of client data that is stored in an inconsistent manner. Between 1000s of fillable PDFs, archaic online forms, and old databases, there’s a real big need for standardization.

In this project, I created a simple front-end version of a form builder that generates a form for users to fill out and allow the user to preview it. It also has the ability to export this structure as JSON.


There are 3 types of form inputs. Each of these can also have sub-inputs which will only show when the parent input is answered a certain way. The types of conditions are as follows

Text
  Equals - Text entered is equal to this value
Number
  Equals - Number entered is equal to this value
  Greater than - Number entered is greater than this value
  Less than - Number entered is less than this value
Yes / No (radio)
Equals - Radio selected is equal to this value (either yes or no)

The user can keep creating sub-inputs with conditions to as many levels deep as they would like. Each sub-input’s condition corresponds to the value of the parent input.

By default, the create tab starts out blank with just the Add Input button for the user to create their first input.

Upon clicking the preview tab, the user is presented with a working demo of the form based on the structure they created in the Create tab. When the preview tab is loaded, it  renders only the parent level questions until the user answers questions. Based on the users answers to questions, the next level of conditional questions are shown.

The preview tab re-renders every time it is clicked with no persistence.

The export tab is simply a textarea containing a serialized JSON form of the form object. This is stored in the local storage for persistence and loaded at page load.
