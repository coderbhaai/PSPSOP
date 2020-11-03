import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Swiper from 'react-id-swiper'

export class Index extends Component {
    render() {
        const params = {
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 2500,
                disableOnInteraction: true,
            },
            slidersPerView: 1,
            effect: "fade",
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            loop: true,
        }
        return (
            <>
                <Header/>
                <div className="banner">
                    <Swiper {...params}>
                        <div >
                            <img src="images/static/banner-1.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Home Loans for Salaried Professionals</h2>
                                <p>Get a home loan as per your needs and budget, at the best rates.</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-2.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>A Transfer that is rewarding and is in your interest</h2>
                                <p>Switch your Existing Home Loan to get Bigger Savings, Lower Rate, Multiple options to switch and win assured Cash back of up to INR 15000/-</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-3.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Reduce your EMI</h2>
                                <p>even if your existing loan is @ Floating Rate</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-4.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Leverage your EXISTING Home Loan</h2>
                                <p>Go on vacation, buy a new car or meet any large expense Without increasing your EMI</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-4.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Be a SAVE-IOUR and get paid for it</h2>
                                <p>Refer The True Loans to your peers, help them save money and get paid for it</p>
                            </div>
                        </div>
                    </Swiper>
                </div>
                <Footer/>
            </>
        )
    }
}

export default Index