import React, { useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import STATISTIC from '../../../../modules/statistic'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../common/Loader/Loader'
const Statistic = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(STATISTIC.load())
    }, [])
    const postsCurrentYearData = useSelector(state => state.statistic.postsCurrentYearData)
    const postsEveryDayData = useSelector(state => state.statistic.postsEveryDayData)
    const amounOfSubscribers = useSelector(state => state.statistic.amounOfSubscribers)
    const avgPostInMonth = useSelector(state => state.statistic.avgPostInMonth)
    const dateOfTheFirstPost = useSelector(state => state.statistic.dateOfTheFirstPost)
    const dateOfTheLastPost = useSelector(state => state.statistic.dateOfTheLastPost)
    const postAmount = useSelector(STATISTIC.getPostAmount)
    const fetching = useSelector(STATISTIC.getFetching)
    return (
        <div>
            {fetching && <Loader></Loader>}
            <p className="ml-5 text"><strong>Поточна кількість підписників:</strong> {amounOfSubscribers}</p>
            <p className="ml-5 text"><strong>Поточна кількість викладених постів:</strong> {postAmount}</p>
            <p className="ml-5 text"><strong>Дата першого викладеного посту:</strong> {
                new Intl.DateTimeFormat('uk-DE', {
                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                }).format(new Date(dateOfTheFirstPost).getTime())
            }</p>
            <p className="ml-5 text"><strong>Дата останнього викладеного посту:</strong> {
                new Intl.DateTimeFormat('uk-DE', {
                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                }).format(new Date(dateOfTheLastPost).getTime())
            }</p>
            <p className="ml-5 text"><strong>Середня кількість постів за місяць викладених за останній рік:</strong> {avgPostInMonth}</p>
            <p className="alignTextCenter text"><strong>Кількість постів викладених за останній рік</strong></p>
            <div>
                <Bar
                    className="diar"
                    data={{
                        labels: [
                            'Січень', 'Лютий', 'Березень',
                            'Квітень', 'Травень', 'Червень',
                            'Липень', 'Серпень', 'Вересень',
                            'Жовтень', 'Листопад', 'Грудень'
                        ],
                        datasets: [{
                            label: 'Кількість постів',
                            data: postsCurrentYearData,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.7)',
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(22, 160, 133, 0.7)',
                                'rgba(46, 204, 113, 0.7)',
                                'rgba(68, 189, 50, 0.7)',
                                'rgba(251, 197, 49, 0.7)',
                                'rgba(232, 65, 24, 0.7)',
                                'rgb(225, 177, 44, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(255, 159, 64, 0.7)',
                                'rgba(211, 84, 0, 0.7)',
                                'rgba(41, 128, 185, 0.7)',
                            ],
                            borderColor: [
                                'rgba(41, 128, 185, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(22, 160, 133, 1)',
                                'rgba(46, 204, 113, 1)',
                                'rgba(68, 189, 50, 1)',
                                'rgba(251, 197, 49, 1)',
                                'rgba(232, 65, 24, 1)',
                                'rgba(225, 177, 44, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(211, 84, 0, 1)',
                                'rgba(54, 162, 235, 1)',

                            ],
                            borderWidth: 1
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return tooltipItem.yLabel;
                                }
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                    max: Math.max(...postsCurrentYearData) + 1
                                }
                            }]
                        }
                    }}
                />
            </div>
            <p className="alignTextCenter text"><strong>Частота викладування постів за увесь час</strong></p>
            <div>
                <Line
                    data={{
                        labels: postsEveryDayData.filter(el => el !== 0).map(el => ''),
                        datasets: [{
                            label: 'Кількість постів',
                            data: postsEveryDayData.filter(el => el !== 0),
                            fill: false,
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                            borderColor: 'rgba(54, 162, 235, 1)'
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return '';
                                }
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    stepSize: 1,
                                    max: Math.max(...postsEveryDayData) + 1
                                },
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                }  
                            }],
                            xAxes: [{
                                gridLines: {
                                    color: "rgba(0, 0, 0, 0)",
                                }   
                            }]
                        }
                    }}
                />
            </div>

        </div>
    )
}

export default Statistic