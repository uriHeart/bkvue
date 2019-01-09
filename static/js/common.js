
$('.main .sec1 .down input').click(function(){
    var $href = $(this).attr('href');
    layer_popup5($href);
    window.location.hash = "#layer5";
});


function layer_popup5(el){
    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수
    isDim ? $('.ip_pop').fadeIn() : $el.fadeIn();
    var $elWidth = ~~($el.outerWidth()),
        $elHeight = ~~($el.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();
    // 화면의 중앙에 레이어를 띄운다.
    if ($elHeight < docHeight || $elWidth < docWidth) {
        $el.css({
            marginTop: -$elHeight /2,
            marginLeft: -$elWidth/2
        })
    } else {
        $el.css({top: 0, left: 0});
    }
    $el.find('a.btn-layerClose').click(function(){
        isDim ? $('.ip_pop').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.dim-layer .dimBg').click(function(){
        $('.ip_pop').fadeOut();
        return false;
    });
}



function tick(){
		$('.main .sec1 .down ul li ul li:first').slideUp( function () { $(this).appendTo($('.main .sec1 .down ul li ul')).slideDown(); });
	}
	setInterval(function(){ tick () }, 5000);
	
	
    
	    $('.animate').scrolla({
    			mobile: true,
    			once: false
    		});

 
    jQuery(document).ready(function( $ ) {
        $("#menu").mmenu({
           "extensions": [
              "position-bottom"
           ],
           "navbars": [
              {
                 "position": "top"
              }
           ]
        });
     });
    
    $(document).ready(function(){
        $(".check ul .title").click(function(){
            var submenu = $(this).next(".text_wrap, .list_wrap");
            
            // submenu 가 화면상에 보일때는 위로 보드랍게 접고 아니면 아래로 보드랍게 펼치기
            if( submenu.is(":visible") ){
                submenu.slideUp();
                $(this).find("span").text("▼");
            }else{
                submenu.slideDown();
                $(this).find("span").text("▲");
            }
        });
 
 
        // menu class 중에 두번째 있는 menu 의 하위에 있는 a태그에 클릭 이벤트를 발생시킨다.
        $(".title:eq(1)>a").click();
    });


 
    
  /*  $(document).ready(function(){ 
        $('.score_box').css('height', $(".score").height()); 
        
        $(window).resize(function() { 
            $('.score_box').css('height', $(".score").height()); 
        }); 
    });*/