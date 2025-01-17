import React, { ReactNode } from "react";

import "quill/dist/quill.snow.css";

export const CustomToolbar = (
  <div id="toolbar" className="">
    <span className="ql-formats ">
      {/* Font Size Dropdown */}
      <select
        className="ql-size bg-[#f9fafb] text-black"
        defaultValue={"normal"}
      >
        <option value="small"></option>
        <option defaultValue="normal" value={"normal"}></option>
        <option value="large"></option>
        <option value="huge"></option>
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
    </span>
  </div>
) as ReactNode;
