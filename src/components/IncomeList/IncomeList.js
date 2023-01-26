
import IncomeItem from "../IncomeItem/IncomeItem"

export default function IncomeList({currentDashboard}) {

    const incomeList = currentDashboard.incomes.map((income, idx)=><IncomeItem currentDashboard={currentDashboard} key={idx} income={income}/>)
  return (
    <>
      {incomeList}

    </>
  );
}
