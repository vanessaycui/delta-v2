import { useState, useEffect } from "react";

import * as dashboardsAPI from "../../utilities/dashboards-api";

export default function IncomeItem({dashId, income}) {
    

  return (
    <tr>
      <td>Categories</td>
      <td>Prev. Month Total</td>
      <td>Overall Monthly Avg.</td>
      <td>% Change</td>
      <td>Current Month</td>
    </tr>
  );
}
