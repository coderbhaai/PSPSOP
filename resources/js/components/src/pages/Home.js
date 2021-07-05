import React, { Component } from 'react'
import Swiper from 'react-id-swiper'
// import Subscribe from '../parts/Subscribe'

export class Home extends Component {
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
                <div className="banner">
                    <Swiper {...params}>
                        <div>
                            <img src="/images/static/banner-1.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>PSP</h2>
                                <p>Description for PSP</p>
                            </div>
                        </div>
                        <div>
                            <img src="/images/static/banner-2.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>PSP</h2>
                                <p>Description for PSP</p>
                            </div>
                        </div>
                        <div >
                            <img src="/images/static/banner-3.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>PSP</h2>
                                <p>Description for PSP</p>
                            </div>
                        </div>
                        <div >
                            <img src="/images/static/banner-4.jpg" alt=""/>
                            <div className="tint"></div>
                            <div className="banner-text">
                                <h2>PSP</h2>
                                <p>Description for PSP</p>
                            </div>
                        </div>
                    </Swiper>
                </div>
                {/* <Subscribe/> */}
            </>
        )
    }
}

export default Home
