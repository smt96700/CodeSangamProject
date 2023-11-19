import {React} from 'react'
import Chart from "react-apexcharts"

function ChartOnCategory({workouts}) {
    const freq = [0,0,0,0,0,0,0,0,0,0]

    workouts.forEach((workout) => {
            let category = workout.category
            if (category === 'Meals/ Entertainment')
                {freq[0]++;}
            if (category === 'Travel')
                {freq[1]++;}           
            if (category === 'Electricity Bill')
                {freq[2]++;}
            if (category === 'Water Bill')
                {freq[3]++;}
            if (category === 'LPG Gas')
                {freq[4]++;}
            if (category === 'Internet and Phone Bills')
                {freq[5]++;}
            if (category === 'Electronic Equipments')
                {freq[6]++;}
            if (category === 'Training/ Education')
                {freq[7]++;}
            if (category === 'Grocery')
                {freq[8]++;}
            if (category === 'Clothing')
                {freq[9]++;}
    })

    return (
        <>
            
            <Chart
                type = "donut"
                width = {520}
                height = {500}
                series = {freq}

                options = {
                    {
                        labels: ['Meals/ Entertainment', 'Travel', 'Electricity Bill', 'Water Bill', 'LPG Gas', 'Internet and Phone Bills', 'Electronic Equipments', 'Training/ Education', 'Grocery', 'Clothing']
                    }
                }
            >
            </Chart>
            
        </>
    )
}

export default ChartOnCategory