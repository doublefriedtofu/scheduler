import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
   const buttonClass = classNames("button", {
      " button--confirm": props.confirm,
      " button--danger": props.danger
   });

   const onClick = props.onClick;
   const disabled = props.disabled;

   return (
      <button
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
      >
         {props.children}
      </button>
   );
}
