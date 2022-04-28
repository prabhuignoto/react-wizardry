import React from "react";
import "./App.css";
import { Wizard } from "./components/wizard";

function App() {
  return (
    <div
      className="App"
      style={{ width: "950px", margin: "0 auto", marginTop: "1rem" }}
    >
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
        validationDelay={100}
        onFinish={(val) => console.log(val)}
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
              {
                name: "dateOfBirth",
                type: "datetime",
                label: "Date of Birth",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
              },
              {
                name: "Phone number",
                label: "Phone",
                type: "phone",
              },
            ],
          },
          {
            title: "Employment",
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
                label: "Are you currently working?",
                name: "employed",
                type: "radio",
                options: [
                  { name: "yes", value: true },
                  { name: "no", value: false },
                ],
              },
              {
                label: "Choose your skills",
                name: "skills",
                type: "checkbox",
                options: [
                  { name: "HTML", value: "html" },
                  { name: "CSS", value: "css" },
                  { name: "JavaScript", value: "javascript" },
                  { name: "React", value: "react" },
                ],
              },
            ],
          },
          {
            title: "CV & Social Links",
            fields: [
              {
                name: "CV",
                label: "Upload your CV",
                type: "file",
              },
              {
                label: "Portfolio URL",
                name: "Portfolio",
                type: "url",
                isRequired: true,
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
                name: "twitter",
                label: "Twitter URL",
                type: "url",
              },
            ],
          },
          {
            title: "salary",
            fields: [
              {
                label: "Select your current salary range",
                name: "salaryRange",
                type: "select",

                options: [
                  { name: "10,000$ - 50,000$", value: "10-50k" },
                  { name: "50,000$ - 100,000$", value: "50-100k" },
                ],
              },
              {
                label: "Expected Salary",
                name: "expectedSalary",
                type: "text",
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default App;
