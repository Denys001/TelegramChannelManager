import React, { useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import STATISTIC from '../../../../modules/statistic'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../common/Loader/Loader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
const Statistic = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(STATISTIC.load())
    }, [])
    const postsCurrentYearData = useSelector(state => state.statistic.postsCurrentYearData)
    const postsLastMonthData = useSelector(state => state.statistic.postsLastMonthData)
    const amounOfSubscribers = useSelector(state => state.statistic.amounOfSubscribers)
    const dateOfTheFirstPost = useSelector(state => state.statistic.dateOfTheFirstPost)
    const dateOfTheLastPost = useSelector(state => state.statistic.dateOfTheLastPost)
    const postAmount = useSelector(STATISTIC.getPostAmount)
    const archiveAmount = useSelector(state => state.statistic.archiveAmount)
    const trashAmount = useSelector(state => state.statistic.trashAmount)
    const amounOfDefaultPosts = useSelector(state => state.statistic.amounOfDefaultPosts)
    const amounOfQuizPosts = useSelector(state => state.statistic.amounOfQuizPosts)
    const fetching = useSelector(STATISTIC.getFetching)
    return (
        <div>
            {fetching && <Loader></Loader>}
            <p className="ml-5 text"><strong>Дата першого опублікуваня:</strong> {
                new Intl.DateTimeFormat('uk-DE', {
                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                }).format(new Date(dateOfTheFirstPost).getTime())
            }</p>
            <Divider />
            <p className="ml-5 text"><strong>Дата останнього опублікуваня:</strong> {
                new Intl.DateTimeFormat('uk-DE', {
                    year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit'
                }).format(new Date(dateOfTheLastPost).getTime())
            }</p>
            <Divider />
            <p className="alignTextCenter text"><strong>Відношення опублікувань</strong></p>
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    <Pie
                        data={{
                            labels: ['Опублікувані', 'В архіві', 'В корзині'],
                            datasets: [
                                {
                                    label: '# of Votes',
                                    data: [postAmount, archiveAmount, trashAmount],
                                    backgroundColor: [
                                        'rgba(75, 192, 192, 0.6)',
                                        'rgba(153, 102, 255, 0.6)',
                                        'rgba(255, 159, 64, 0.6)',
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',

                                    ],
                                    borderColor: [
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    position: 'left',
                                },
                                title: {
                                    display: true,
                                    text: 'Chart.js Pie Chart'
                                }
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Box my={2}>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість опублікувань:</strong> {postAmount}</p>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість опублікувань в архіві:</strong> {archiveAmount}</p>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість опублікувань в корзині:</strong> {trashAmount}</p>
                <Divider />
            </Box>


            <p className="alignTextCenter text"><strong>Кількість опублікувань за поточний рік</strong></p>
            <Divider />
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
                        responsive: true,
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
            <p className="alignTextCenter text"><strong>Частота опублікувань за місяць</strong></p>
            <div>
                <Line
                    data={{
                        labels: Object.keys(postsLastMonthData),
                        datasets: [{
                            label: 'Кількість постів',
                            data: Object.values(postsLastMonthData),
                            fill: false,
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                            borderColor: 'rgba(54, 162, 235, 1)'
                        }]
                    }}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
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
                            // yAxes: [{
                            //     ticks: {
                            //         beginAtZero: true,
                            //         stepSize: 1,
                            //         max: Math.max(...postsLastMonthData) + 1
                            //     },
                            //     gridLines: {
                            //         color: "rgba(0, 0, 0, 0)",
                            //     }  
                            // }],
                            // xAxes: [{
                            //     gridLines: {
                            //         color: "rgba(0, 0, 0, 0)",
                            //     }   
                            // }]
                        }
                    }}
                />
            </div>
            <p className="alignTextCenter text"><strong>Відношення опублікувань за типом</strong></p>
            <Grid container justify="center">
                <Grid item xs={12} sm={6}>
                    <Pie
                        data={{
                            labels: ['Пост', 'Опитування'],
                            datasets: [
                                {
                                    label: '# of Votes',
                                    data: [amounOfDefaultPosts, amounOfQuizPosts],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.9)',
                                        'rgba(54, 162, 235, 0.9)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }} />
                </Grid>
            </Grid>
            <Box my={2}>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість опублікованих постів:</strong> {amounOfDefaultPosts}</p>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість опублікованих опитувань:</strong> {amounOfQuizPosts}</p>
                <Divider />
                <p className="ml-5 text"><strong>Поточна кількість підписників:</strong> {amounOfSubscribers}</p>
                <Divider />
            </Box>
        </div>
    )
}

export default Statistic