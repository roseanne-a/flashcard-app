import "./Index.css";

import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ subLink, subLinkName, currentPage }) {
  const link = subLinkName ? (
    <>
      <Link to={subLink}>{subLinkName}</Link> {"/"}
    </>
  ) : (
    ""
  );
  return (
    <div className="breadcrumb">
      <Link to="/">
        <i className="bi-house-fill icon"></i>Home
      </Link>{" "}
      / {link}
      {currentPage}
    </div>
  );
}
