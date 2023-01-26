import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import "./DoughnutChart.css"

export default function DoughnutChart({data}){
    const options={
        animation:{
            animateScale: true
        }
      }

    return <div><Doughnut
    data={data}
    options={options}
    /></div>

}

