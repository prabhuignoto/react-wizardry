import "./App.css";
import { Wizard } from "./components/wizard";

import Box from "./example-assets/box";
import Dollar from "./example-assets/dollar";
import Twitter from "./example-assets/twitter";
import User from "./example-assets/user";

function App() {
  return (
    <div
      className="App"
      style={{ margin: "0 auto", marginTop: "1rem", width: "950px" }}
    >
      <Wizard
        bodyHeight={750}
        highlightFieldsOnValidation
        noPageTitle
        onFinish={(val) => console.log(val)}
        pages={[
          {
            fields: [
              {
                isRequired: true,
                label: "First Name",
                name: "firstName",
                placeholder: "Enter your first name",
                type: "text",
                validationMessage: "You cannot leave this field empty",
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
              },
              {
                label: "Date of Birth",
                name: "dateOfBirth",
                type: "date",
              },
              {
                isRequired: true,
                label: "Email",
                name: "email",
                type: "email",
                validationMessage: "Incorrect email id. example: xxxx@yyy.com",
              },
              {
                label: "Phone",
                name: "Phone number",
                type: "phone",
              },
            ],
            title: "Introduction",
          },
          {
            fields: [
              {
                label: "Company Name",
                name: "companyName",
                type: "text",
              },
              {
                label: "Designation",
                name: "designation",
                type: "text",
              },
              {
                label: "Description",
                name: "description",
                type: "textarea",
              },
              {
                isRequired: true,
                label: "Are you currently working?",
                name: "employed",
                options: [
                  { name: "yes", value: true },
                  { name: "no", value: false },
                ],
                type: "radio",
              },
              {
                isRequired: true,
                label: "Choose your skills",
                name: "skills",
                options: [
                  { name: "HTML", value: "html" },
                  { name: "CSS", value: "css" },
                  { name: "JavaScript", value: "javascript" },
                  { name: "React", value: "react" },
                ],
                type: "checkbox",
              },
            ],
            title: "Employment",
          },
          {
            fields: [
              {
                label: "Upload your CV",
                name: "CV",
                type: "file",
              },
              {
                isRequired: true,
                label: "Portfolio URL",
                name: "Portfolio",
                type: "url",
              },
              {
                label: "Linkedin URL",
                name: "linkedin",
                type: "url",
              },
              {
                label: "Github URL",
                name: "Github",
                type: "url",
              },
              {
                label: "Twitter URL",
                name: "twitter",
                type: "url",
              },
            ],
            title: "CV & Social Links",
          },
          {
            fields: [
              {
                isRequired: true,
                label: "Select your current salary range",
                name: "salaryRange",
                options: [
                  { name: "10,000$ - 50,000$", value: "10-50k" },
                  { name: "50,000$ - 100,000$", value: "50-100k" },
                ],

                type: "select",
              },
              {
                label: "Expected Salary",
                name: "expectedSalary",
                type: "text",
              },
            ],
            title: "salary",
          },
        ]}
        // noPageTitle
        icons={[
          <User key="usr" />,
          <Box key="box" />,
          <Twitter key="twitter" />,
          <Dollar key="dollar" />,
        ]}
        // silent
        showStepperTitles
        strict={false}
        theme={{
          background: "#000",
          fail: "#cf352e",
          formFieldBackground: "#282828",
          formFieldBorder: "#000",
          inputBackground: "#464646",
          inputTextColor: "#fff",
          primary: "#007fff",
          success: "#519259",
          tabColor: "#7d7d7d",
          tabLineColor: "#464646",
          textColor: "#fff",
        }}
        validationDelay={100}
      />
    </div>
  );
}

export default App;
