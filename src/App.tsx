import React from "react";
import "./App.css";
import { Wizard } from "./components/wizard";

function App() {
  return (
    <div
      className="App"
      style={{ width: "900px", margin: "0 auto", marginTop: "1rem" }}
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
        }}
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
              {
                label: "Email",
                name: "email",
                type: "text",
                isRequired: true,
              },
              {
                name: "dateOfBirth",
                type: "datetime",
                label: "Date of Birth",
              },
            ],
          },
          {
            title: "employment",
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
              {
                name: "CV",
                label: "Upload your CV",
                type: "file",
                isRequired: true,
              },
            ],
          },
          {
            title: "salary",
            fields: [
              {
                label: "Choose a range",
                name: "range",
                type: "select",
                selectOptions: [
                  { name: "one", value: "one" },
                  {
                    name: "two",
                    value: "two",
                  },
                ],
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
              },
            ],
          },
          {
            title: "polo",
            fields: [
              {
                label: "First Name",
                name: "firstName",
                type: "text",
              },
              {
                label: "Last Name",
                name: "lastName",
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
