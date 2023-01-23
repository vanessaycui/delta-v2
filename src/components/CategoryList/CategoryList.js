import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";
import CategoryItem from "../CategoryItem/CategoryItem"

export default function CategoryList({categories, dashId}) {

    const categoryList = categories.map((category, idx)=><CategoryItem dashId={dashId} key={idx} category={category}/>)
  return (
    <tbody>
      {categoryList}
    </tbody>
  );
}
