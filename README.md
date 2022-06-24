<p align="center">
  <a href="" rel="noopener">
 <img src="./logo.svg" alt="Project logo"></a>
</p>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/react-wizardry)
[![Snyk](https://snyk.io/test/github/prabhuignoto/react-wizardry/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-wizardry)
[![Version](https://badgen.net/npm/v/react-wizardry)](/Version)
<!-- [![DeepSource](https://deepsource.io/gh/prabhuignoto/react-wizardry.svg/?label=active+issues&token=Ee287EMM6gK3NGg-jjAbMeKj)](https://deepsource.io/gh/prabhuignoto/react-wizardry/?ref=repository-badge) -->

</div>

> react-wizardry is a data-driven smart wizard component for creating powerful forms with in built validations.

---

![demo](./react-wizardry.gif)

[Demo](https://codesandbox.io/s/react-wizardy-multi-forms-io9ey5)

<h2>Features</h2>

- ⚡Data driven API
- ✅In built validations
- 💪Built with Typescript
- 💡Intuitive stepper interface
- 🎨Customizable Theme

<h2>Table of Contents</h2>

- [📦 Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Properties](#️-properties)
- [Page](#page)
- [Form field](#form-field)
- [Form field types](#form-field-types)
- [Accessing the wizard data](#accessing-the-wizard-data)
- [Custom validation messages](#custom-validation-messages)
- [Custom icons](#custom-icons)
- [🎨 Theme](#-theme)
- [CodeSandbox examples](#codesandbox-examples)
- [⛏️ Built With](#️-built-with)
- [✍️ Authors](#️-authors)

## 📦 Installation

Install the package via `npm` or `yarn`

```sh
npm install react-wizardry
```

```sh
yarn add react-wizardry
```

## 🚀 Getting Started

The component takes a pages collection and renders the pages in a stepper interface.The pages appear in the order they are passed in the pages collection.

The example shows a simple wizard with two pages.

```jsx
<Wizard
  pages={[
    {
      title: "Introduction",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
          isRequired: true,
        },
      ],
  },
  {
    title: "Contact",
    fields: [
      {
        label: "Email",
        name: "email",
        type: "email",
        isRequired: true,
      },
    ],
 }
},
```

## ⚙️ Properties

| Name                          | Description                                                                                                                                                                                             | Default |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `bodyHeight`                  | Sets the height of the form body                                                                                                                                                                        | 500     |
| `highlightFieldsOnValidation` | Highlights the fields when the validation fails or succeeds                                                                                                                                             | false   |
| `onFinish`                    | Callback executed on final step                                                                                                                                                                         |         |
| `pages`                       | Collection of [Page](#Page) object                                                                                                                                                                      |         |
| `RTL`                         | Enables right to left mode                                                                                                                                                                              | false   |
| `showStepperTitles`           | Use this prop to display page titles under the stepper points                                                                                                                                           | false   |
| `silent`                      | Validation errors are flagged subtly. Validation messages are displayed only when the mouse is hovered over the field                                                                                   | false   |
| `stepperItemWidth`            | Sets the width of each stepper item                                                                                                                                                                     | "200px" |
| `strict`                      | Validation rules are applied to all inputs that have been marked for validation or that are required.<br>The component prevents the user from moving on until the current step's errors have been fixed | false   |
| `theme`                       | [Theme](#🎨-theme) object for customized styling                                                                                                                                                         |         |

## Page

Page object is at the core of the wizard. Page object is used to define the title, description, fields, and validation rules for a page.

| Name                   | Description                                                          | Type     |
| :--------------------- | :------------------------------------------------------------------- | :------- |
| fields                 | Fields of the Page                                                   | Array    |
| finishMessage          | Custom message to be displayed on finish operation                   | String   |
| globalFormErrorMessage | Global error message to be displayed on validation failures          | String   |
| isActive               | Indicates whether the page is active or not                          | Boolean  |
| onChange               | Callback executed when any of the Form field value changes(Internal) | Function |
| state                  | State of the Page. can be `NOT_VALIDATED`, `SUCCESS`, `FAIL`,        | String   |
| title                  | Title of the Page                                                    | String   |

> Every page is in the `NOT_VALIDATED` state by default.

Here is an examples how to define pages in the wizard. We are defining two pages with two fields.

```jsx
<Wizard
  pages={[
    {
      title: "Introduction",
      fields: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          isRequired: true,
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          isRequired: true,
        },
      ],
  },
  {
    title: "Contact",
    fields: [
      {
        label: "Email",
        name: "email",
        type: "email",
        isRequired: true,
      },
      {
        name: "Phone number",
        label: "Phone",
        type: "phone",
        isRequired: true,
      },
    ],
 }
},
```

## Form field

Form field represents an input field in the wizard. Form field is used to define the label, type, validation rules, and other properties.

| Name              | Description                                                 | Type      |
| :---------------- | :---------------------------------------------------------- | :-------- |
| isRequired        | Marks the field as required                                 | boolean   |
| label             | Label for the field                                         | string    |
| name              | Name of the Field                                           | string    |
| selectOptions     | Use this prop when type is "select"                         | Array     |
| type              | Type of Field                                               | InputType |
| validate          | Enables validation for the field                            | boolean   |
| validationMessage | Custom validation message to be shown on validation failure | boolean   |

> Fields marked as required are automatically validated. If you set `isRequired` to `false` and `validate` to `true`, the wizard will validate and flag the errors, but the step itself will not be marked as invalid.

In the example below we are defining two fields and making them required.

```jsx
<Wizard
  pages={[
    {
      title: "Introduction",
      fields: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          isRequired: true,
        },
        {
          label: "Last Name",
          name: "lastName",
          type: "text",
          validate: true,
        },
      ],
  },
]}
```

Here only the First Name field is required. The last name field will be validated if the user enters a value.

## Form field types

Form field supports the following types:

- **text**: Text input field
- **email**: Email input field
- **phone**: Phone input field
- **number**: Number input field
- **password**: Password input field
- **textarea**: Textarea input field
- **select**: Select input field
- **checkbox**: Checkbox input field
- **radio**: Radio input field
- **datetime**: DateTime input field
- **file**: File input field

All the above input types comes with inbuilt validation.

## Accessing the wizard data

The `onFinish` callback receives the wizard data with each key representing a page.

For the getting started example, the `onFinish` callback will receive an object with the following structure:

```js
{
  "introduction": {
    "firstName": "<entered name>",
    "lastName": "<entered name>",
  },
  "contact": {
    "email": "<entered email id>";
    "phone": "<entered phone number>",
  }
}
```

## Custom validation messages

Validation messages are enabled by default for all fields. However, the `validationMessage` property allows you to customize the message for each field.

```jsx
<Wizard
  pages={[
    {
      title: "Introduction",
      fields: [
        {
          label: "First Name",
          name: "firstName",
          type: "text",
          isRequired: true,
          validationMessage: "Please enter your first name",
        },
      ],
  },
]}
```

## Custom icons

You can change the icons on the stepper head by giving the `icons` prop an array of icons as react components.

```jsx
<Wizard
  ...
  icons={[
    <User key="usr" />,
    <Box key="box" />,
    <Twitter key="twitter" />,
    <Dollar key="dollar" />,
  ]}
/>
```

## 🎨 Theme

Customize the look and feel of the Wizard through the `theme` object.


| Name                | Description                                              | Data Type | Default |
| :------------------ | :------------------------------------------------------- | :-------- | :------ |
| background          | Background color of the wizard                           | string    | #f8f8f8 |
| fail                | Colour to signify failed state                           | string    | #de1738 |
| formFieldBackground | Background color of the Form field                       | string    | #ffffff |
| formFieldBorder     | Border colour of the form field                          | string    | #dcdcdc |
| inputBackground     | Background color of the native input control             | string    | #e8e8e8 |
| inputTextColor      | Fore color of the text inside the native input control   | string    | #000000 |
| primary             | Primary colour. This color will be the predominant color | string    | #007fff |
| success             | Colour to signify a success state                        | string    | #1db954 |
| tabColor            | Colour of the tab                                        | string    | #f8f8f8 |
| tabLineColor        | Colour of the line that runs through all the tabs        | string    | #ccc    |
| textColor           | Colour of all texts                                      | string    | #000000 |

Here is a short example of how to use the theme object.

```jsx
<Wizard
  theme={{
    primary: "#007fff",
    background: "#000",
    textColor: "#fff",
    formFieldBackground: "#282828",
    formFieldBorder: "#000",
    success: "#519259",
    fail: "#cf352e",
    inputBackground: "#464646",
    inputTextColor: "#fff",
    tabLineColor: "#464646",
    tabColor: "#7d7d7d",
  }}
/>
```

## CodeSandbox examples

  1. [Basic Wizard](https://codesandbox.io/s/react-wizardy-simple-form-vu3y6b)
  2. [Complex Wizard](https://codesandbox.io/s/react-wizardy-multi-forms-io9ey5)
  3. [Wizard with custom theme](https://codesandbox.io/s/react-wizardy-theme-hzf5bx)
  4. [Custom Icons](https://codesandbox.io/s/react-wizardy-custom-icons-d2rkin?file=/src/App.js)
  5. [RTL](https://codesandbox.io/s/react-wizardy-rtl-misojt)
  6. [Silent Mode](https://codesandbox.io/s/react-wizardy-silent-m4m3j8?file=/src/App.js)
  7. [Display stepper titles](https://codesandbox.io/s/react-wizardy-stepper-title-2yhqx7?file=/src/App.js)

## ⛏️ Built With

- [React](http://reactjs.org) - A JavaScript library for building user interfaces.
- [Typescript](https://www.typescriptlang.org) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [SCSS](https://sass-lang.com) - A CSS preprocessor and compiler.
- [Webpack](https://webpack.js.org) - Webpack is a module bundler that packs multiple modules into a single file.
- [Eslint](https://eslint.org) - ESLint is a linter for JavaScript and JSX.
- [Prettier](https://prettier.io) - Prettier is a tool to format code.

## ✍️ Authors

- [@prabhuignoto](https://github.com/prabhuignoto) - Idea & Initial work
