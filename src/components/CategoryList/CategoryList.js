import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";
import CategoryItem from "../CategoryItem/CategoryItem"

export default function CategoryList({currentDashboard}) {

    const categoryList = currentDashboard.categories.map((category, idx)=><CategoryItem dashId={currentDashboard._id} key={idx} category={category}/>)
  return (
    <tbody>
      {categoryList}

    </tbody>
  );
}
