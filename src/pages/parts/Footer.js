import React from 'react'
import Form from './Form'


function Footer() {
    return (
        <>
            <footer className="pt-5" >
                <div className="container my-3">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3>Important Links</h3>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <h3>Our Products</h3>
                            <ul>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                                <li><a href="#">Links</a></li>
                            </ul>
                            <div className="social">
                                <h3>Follow Us</h3>
                                <ul>
                                    <li><a href="#"><img src="images/icons/facebook.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/instagram.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/linkedin.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/twitter.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/youtube.svg" alt=""/></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h3>Contact Us</h3>
                            <Form/>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 akk">
                            <p className="text-center">© 2020 | Designed &amp; Developed by <a href="https://www.amitkk.com/" target="_blank">AmitKK</a> </p>
                        </div>
                    </div>
                </div>
            </footer>
            <a target="_blank" href="//api.whatsapp.com/send?phone=918424003840&amp;text= Hi, I got your number from AmitKK Website." className="whatsButton ctaBtn"><img src="/images/icons/whatsapp-button.svg" alt="Connect with AmitKK on Whats App"/></a>
            <a href="tel:8424003840" className="callButton ctaBtn"><img src="/images/icons/call-button.svg" alt="Call AmitKK Now" className=""/></a>
        </>
    )
}

export default Footer