
import IncomeItem from "../IncomeItem/IncomeItem"

export default function IncomeList({currentDashboard}) {

    const incomeList = currentDashboard.incomes.map((income, idx)=><IncomeItem dashId={currentDashboard._id} key={idx} income={income}/>)
  return (
    <tbody>
      {incomeList}

    </tbody>
  );
}
