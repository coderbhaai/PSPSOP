import React, { Component } from 'react'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import Swiper from 'react-id-swiper'

export class Index extends Component {
    render() {
        const params = {
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 7500,
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
                                <h2>Product Information</h2>
                                <p>Short Snippet on product infromation oges here</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-2.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Product Information</h2>
                                <p>Short Snippet on product infromation oges here</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-3.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Product Information</h2>
                                <p>Short Snippet on product infromation oges here</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-4.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Product Information</h2>
                                <p>Short Snippet on product infromation oges here</p>
                            </div>
                        </div>
                        <div >
                            <img src="images/static/banner-4.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>Product Information</h2>
                                <p>Short Snippet on product infromation oges here</p>
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