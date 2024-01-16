import React, { useEffect, useRef, useState } from 'react'
import { Chart } from 'chart.js/auto'
import Dashboard from '../Dashboard'

function Activity() {

    const [activityData, setActivityData] = useState({
        'Monday': 6,
        'Tuesday': 3,
        'Wednesday': 4,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 4,
        'Sunday': 6,
    })

    const ActivityChart = ({ activityData }) => {
        const chartRef = useRef(null);

        useEffect(() => {
            const labels = Object.keys(activityData);
            const dataPoints = labels.map(day => activityData[day]);

            const ctx = document.getElementById('activityAreaChart').getContext('2d');

            // Check if a chart instance already exists and destroy it
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create a new chart instance
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Chatting Hours per Day',
                            data: dataPoints,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: {
                                target: 'origin',
                                above: 'rgba(75, 192, 192, 0.2)',
                            },
                            tension: 0.5,
                        },
                    ],
                },
            });

            // Clean up the chart when the component is unmounted
            return () => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
            };
        }, [activityData]);

        return <canvas id="activityAreaChart" width="400" height="200"></canvas>;
    };

    return (
        <div className='flex flex-col h-screen'>
            <Dashboard />

            <div className='flex flex-row m-10 font-bold text-lg items-center justify-between'>
                <h1>Your Statistics</h1>
                <div className="mt-2">
                    <select
                        id="duration"
                        name="duration"
                        autoComplete="duration"
                        className="block w-full rounded-full border-0 py-1.5 text-violet-600 shadow-sm ring-1 ring-inset ring-violet-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='flex-1 p-10 overflow-auto'>
                    <ActivityChart activityData={activityData} />
                </div>


                <div className="flex m-10">

                </div>
            </div>
        </div>
    )
}

export default Activity
