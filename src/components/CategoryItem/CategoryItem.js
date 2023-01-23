import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";

export default function CategoryItem({dashId, category}) {
    //sort entry data by dash id and category. add all according to prev month, percent change, current month.
    //clikcing on category item will trigger form to open.
  return (
    <tr>
      <td>Categories</td>
      <td>Prev. Month Total</td>
      <td>% Change</td>
      <td>Current Month</td>
    </tr>
  );
}
