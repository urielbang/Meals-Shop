import React from "react";

export default function Button({ children, textOnly, className, ...props }) {
  let ccClasses = textOnly ? "text-button" : "button";
  ccClasses += " " + className;

  return (
    <button {...props} className={ccClasses}>
      {children}
    </button>
  );
}
