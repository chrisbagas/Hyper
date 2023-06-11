import Chart from 'chart.js/auto';
import { useEffect } from "react"

export interface CardLineChartProps {
    dataset:any
    children:any
}

export const CardLineChart: React.FC<CardLineChartProps> = ({ dataset }) => {

    let myChart:any = null 

    useEffect(() => {

    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx || !(ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
    }

    myChart?.clear();
    myChart?.destroy();

    /* eslint-disable */
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            datasets: [{
                    data: [86, 114, 106, 106, 107, 111, 133],
                    label: "Applied",
                    borderColor: "#3e95cd",
                    backgroundColor: "#7bb6dd",
                    fill: false,
                }, {
                    data: [70, 90, 44, 60, 83, 90, 100],
                    label: "Accepted",
                    borderColor: "#3cba9f",
                    backgroundColor: "#71d1bd",
                    fill: false,
                }, {
                    data: [10, 21, 60, 44, 17, 21, 17],
                    label: "Pending",
                    borderColor: "#ffa500",
                    backgroundColor: "#ffc04d",
                    fill: false,
                }
            ]
        },
    });
    }, [])
    /* eslint-enable */
  
    return (
        <>
        <div className="w-full flex">
            <div className="pt-0 rounded-xl w-full h-fit my-auto">
            <canvas id='myChart'></canvas>
            </div>
        </div>
        </>
    )
}