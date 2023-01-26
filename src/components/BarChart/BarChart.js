import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import "./BarChart.css"

export default function BarChart({chartData}){
    const options={
        scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  callback: function(value, index, ticks){
                      return '$' + value
                  }
              },
              display: true
          }
        }
      }

    return <div className="BarChart"><Bar
    data={chartData}
    options={options}
    /></div>
}