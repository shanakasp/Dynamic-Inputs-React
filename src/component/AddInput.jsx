import React, { useState } from "react";
import { Link } from "react-router-dom";

function AddInput() {
  const [inputList, setInputList] = useState([
    { title: "", type: "text", options: [] },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log("Updated State:", list);
  };

  const handleRemove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log("Updated State:", list);
  };

  const handleAddClick = async () => {
    const newList = [...inputList, { title: "", type: "text", options: [] }];
    setInputList(newList);
    console.log("Updated State:", newList);

    // Call your backend API to save the new question
    try {
      const response = await fetch("your-backend-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList[newList.length - 1]), // Send the last added question
      });

      if (!response.ok) {
        throw new Error("Failed to add question to the backend");
      }

      console.log("Question added to the backend successfully!");
    } catch (error) {
      console.error("Error adding question to the backend:", error.message);
    }
  };

  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].options = value.split(",").map((opt) => opt.trim());
    setInputList(list);
    console.log("Updated State:", list);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h5 className="mt-3 mb-4 fw-bold">
            Add Your Questions //Relevant body part name appear here
          </h5>
          <div className="d-flex justify-content-end">
            <Link to="/ShowAskedQ" className="btn btn-warning ms-auto">
              <button className="btn btn-warn">Asked Questions</button>
            </Link>
          </div>

          {inputList.map((x, i) => {
            return (
              <div className="row mb-3" key={i}>
                <div className="form-group col-md-4">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Title"
                    value={x.title}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label>Answer Type</label>
                  <select
                    className="form-control"
                    name="type"
                    value={x.type}
                    onChange={(e) => handleInputChange(e, i)}
                  >
                    <option value="text">Text Input</option>
                    <option value="radio">Radio Buttons</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>
                {x.type !== "text" && (
                  <div className="form-group col-md-4">
                    <label>
                      {x.type === "radio" ? "Options" : "Dropdown Options"}{" "}
                      (comma-separated)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option 1, Option 2, ..."
                      value={x.options.join(", ")}
                      onChange={(e) => handleOptionChange(e, i)}
                    />
                  </div>
                )}
                <div className="form-group col-md-2 mt-4">
                  {inputList.length !== 1 && (
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleRemove(i)}
                      style={{ marginBottom: 10 }}
                    >
                      Remove
                    </button>
                  )}
                  <br />
                  {inputList.length - 1 === i && (
                    <button
                      className="btn btn-success"
                      onClick={handleAddClick}
                    >
                      Add More
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AddInput;
