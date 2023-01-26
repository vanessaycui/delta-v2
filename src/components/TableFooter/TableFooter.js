export default function TableFooter({ summaryData }) {

  return (

        <tfoot>
          <tr>
            <td>Expense Total:</td>
            <td className="summary-footer">${Object.keys(summaryData).length >0 ? summaryData.prevMonth.expenseTotal:0}</td>
            <td></td>
            <td className="summary-footer">${Object.keys(summaryData).length >0 ? summaryData.currMonth.expenseTotal:0}</td>
          </tr>
          <tr>
            <td>Income Total:</td>
            <td className="summary-footer">${Object.keys(summaryData).length >0 ? summaryData.prevMonth.incomeTotal:0}</td>
            <td></td>
            <td className="summary-footer">${Object.keys(summaryData).length >0 ? summaryData.currMonth.incomeTotal:0}</td>
          </tr>
          <tr>
            <td>Net Savings:</td>
            <td className="summary-footer" style={{color: (Object.keys(summaryData).length >0 ? summaryData.prevMonth.netSavings:0)<0? "var(--orange)":"var(--black)"}}>${Object.keys(summaryData).length >0 ? summaryData.prevMonth.netSavings:0}</td>
            <td></td>
            <td className="summary-footer" style={{color: (Object.keys(summaryData).length >0 ? summaryData.prevMonth.netSavings:0)<0? "var(--orange)":"var(--black)"}}>${Object.keys(summaryData).length >0 ? summaryData.currMonth.netSavings:0}</td>
          </tr>
        </tfoot>

  );
}
