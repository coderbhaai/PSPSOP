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
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/contact-us">Contact Us</a></li>
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/terms-of-use">T&amp;C </a></li>
                                <li><a href="/disclaimer">Disclaimer</a></li>
                                <li><a href="/sitemap">Sitemap</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            <h3>Our Products</h3>
                            <ul>
                                <li><a href="/home-loan-for-salaried-professionals">Home Loan for salaried professionals</a></li>
                                <li><a href="/home-loan-for-self-employed">Home Loan for Self Employed </a></li>
                                <li><a href="/home-construction-loan">Home Construction Loan</a></li>
                                <li><a href="/loan-against-property">Loan Against Property- LAP</a></li>
                                <li><a href="/balance-transfer-of-existing-loan">Balance Transfer of Existing Loan</a></li>
                            </ul>
                            {/* <div className="social">
                                <h3>Follow Us</h3>
                                <ul>
                                    <li><a href="#"><img src="images/icons/facebook.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/instagram.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/linkedin.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/twitter.svg" alt=""/></a></li>
                                    <li><a href="#"><img src="images/icons/youtube.svg" alt=""/></a></li>
                                </ul>
                            </div> */}
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
                            <p className="text-center">© 2020 | Designed & Developed by <a href="https://www.amitkk.com/" target="_blank">AmitKK</a> </p>
                        </div>
                    </div>
                </div>
            </footer>
            <a target="_blank" href="//api.whatsapp.com/send?phone=918424003840&amp;text= Hi, I got your number from AmitKK Website." className="whatsButton ctaBtn"><img src="/images/icons/whatsapp-button.svg" alt="Connect with AmitKK on Whats App"/></a>
            <a href="tel:8424003840" className="callButton ctaBtn"><img src="/images/icons/call-button.svg" alt="Call AmitKK Now" className=""/></a>
            {/* <div className="callBack">
                <div className="modal fade" id="callBack" tabIndex="-1" role="dialog" aria-label="callBackTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="heading">Get a Home Loan</h2>
                                <button data-dismiss="modal" aria-label="Close" className="closeBtn">X</button>
                            </div>
                            <div className="modal-body container">
                                <div className="row">
                                    <div className="col-sm-8 order-2">
                                        <h3>Best Home loans</h3>
                                        <p>Thanks for reaching out to us. We are happy to provide you below services.</p>
                                        <ul>
                                            <li><a href="/balance-transfer-of-existing-loan">Balance Transfer of Existing Loan</a></li>
                                            <li><a href="/home-construction-loan">Home Construction Loan</a></li>
                                            <li><a href="/new-home-loan">New Home Loan</a></li>
                                            <li><a href="/home-improvement-loan">Home Improvement Loan</a></li>
                                            <li><a href="/loan-against-property">Loan Against Property</a></li>
                                            <li><a href="/plot-loan">Plot Loan</a></li>
                                        </ul>
                                        <p>Simply fill the form and we will be happy to share just the quote you have been looking for.</p>
                                    </div>
                                    <div className="col-sm-4 loanForm">
                                        <Form/>
                                        <div className="modal-">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Footer