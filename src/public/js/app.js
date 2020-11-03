$(document).ready(function(){
    //change BG image of slider on hover
    $(".agenda .swiper-slide").mouseover(function(){
        var slider = $(this);
        var bgImg = slider.attr("data-bg")
        var id = parseInt( slider.attr('data-swiper-slide-index'))+1
        var agendaId = slider.parents("section").attr("class").replace('agenda-','')
        if(agendaId && agendaId!==id){
            slider.parents("section").css({ "background": "linear-gradient(to bottom,transparent 0%,rgb(0 0 0 / 43%) 35%,rgba(0,0,0,0.4) 100%), url("+bgImg+") no-repeat center", "background-size": "cover" })
        }
    })
    //change BG image of slider on Click of arrows
    $(".agenda .swiper-button-next").click(function(){  sliderClicked() })
    $(".agenda .swiper-button-prev").click(function(){  sliderClicked() })
    sliderClicked=()=>{
        var agenda = $(document).find(".agenda").children("section")
        var agendaId = agenda.attr('class').replace('agenda-','')
        var newId = parseInt( $(document).find(".agenda .swiper-slide-active").attr('data-swiper-slide-index') )+1
        var bgImg = $(document).find(".agenda .swiper-slide-active").attr('data-bg')
        if(agendaId && agendaId!==newId){
            agenda.css({ "background": "linear-gradient(to bottom,transparent 0%,rgb(0 0 0 / 43%) 35%,rgba(0,0,0,0.4) 100%), url("+bgImg+") no-repeat center", "background-size": "cover" })
        }
    }
    //Display elements on hover
    $(".itemContent").hover(function(){
        $(this).find('.itemContentInfo').animate({height:200},300);
        $(this).find('.itemContentTitle').addClass('itemContentTitleHover');  
      },function(){
        $(this).find('.itemContentInfo').animate({height:0},300);
        $(this).find('.itemContentTitle').removeClass('itemContentTitleHover'); 
    });

    $(".points .col-sm-4 button").click(function(){
        var btn = $(this);
        var id = btn.attr("data-target")
        $(document).find(".child-active").removeClass('child-active').css({ "display": "none" }).animate({height:'0'}).removeAttr('id', "child-active")
        $(document).find(".child-".concat(id)).addClass('child-active').css({ "display": "block" }).animate({height:'100%'},300).attr("id", "child-active");
        if(window.innerWidth<991){ 
            var element = document.getElementById("child-active");
            const yOffset = -50; 
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    });

    $(".closeAmitBtn").click(function(){
        $(document).find(".child-active").removeClass('child-active').css({ "display": "none" }).animate({height:'0'}).removeAttr('id', "child-active")
    });

    // Graphics Design Image pop up
    $(".graphicsSlider .swiper-slide").click(function(){
        document.getElementById("myModal").style.display = "block";
        var slider = $(this);
        var id = parseInt( slider.attr('data-swiper-slide-index'))+1
        showSlides(slideIndex = id);        
    })
    $(".graphicsModal .prev").click(function(){ showSlides(slideIndex += -1); })
    $(".graphicsModal .next").click(function(){ showSlides(slideIndex += 1); })
    $(".graphicsModal .thumbnail img").click(function(){ 
        var thumb = $(this);
        var id = parseInt( thumb.attr('data-slide'))
        showSlides(slideIndex = id);
    })
    showSlides=(n)=>{
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        captionText.innerHTML = dots[slideIndex-1].alt;
    }   
    $("#myModal .close").click(function(){ document.getElementById("myModal").style.display = "none"; })    
    // Graphics Design Image pop up

});