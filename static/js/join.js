

$('.btn-example3').click(function(){
    var $href = $(this).attr('href');
    layer_popup3($href);
    window.location.hash = "#layer3";
});

$('.btn-example4').click(function(){
    var $href = $(this).attr('href');
    layer_popup4($href);
    window.location.hash = "#layer4";
});



function layer_popup4(el){
    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수
    isDim ? $('.join_pop4').fadeIn() : $el.fadeIn();
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
        isDim ? $('.join_pop4').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.dim-layer .dimBg').click(function(){
        $('.join_pop4').fadeOut();
        return false;
    });
}

function layer_popup3(el){
    var $el = $(el);        //레이어의 id를 $el 변수에 저장
    var isDim = $el.prev().hasClass('dimBg');   //dimmed 레이어를 감지하기 위한 boolean 변수
    isDim ? $('.join_pop3').fadeIn() : $el.fadeIn();
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
        isDim ? $('.join_pop3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
        return false;
    });

    $('.dim-layer .dimBg').click(function(){
        $('.join_pop3').fadeOut();
        return false;
    });
}



jQuery( function($) {
	var re_id = /^[a-z0-9_-]{3,16}$/;
	var re_tel = /^[0-9]{0,21}$/;
	var re_pw2 = /^[a-z0-9_-]$/;
	var re_usename = /^[가-힣]{2,4}$/;
	var re_usemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   
	var form = $('.form'), 
		uid = $('#uid'),
		mail = $('#uid2'), 
		result = $('#result');
		upw = $('#upw'), 
		upw2 = $('#upw2'), 
		url = $('#url'), 
		usetel = $('#usetel');
		usename = $('#usename');
		usemail = $('#usemail');
		
	$('.select_box_wrap select,#upw, #upw2, #usename, #usetel2, #usemail').after('<p></p>');
	
	upw.keyup( function() {
		var s = $(this).next('p');
		if (upw.val().length == 0) { 
			s.text(''); //
		}  else if (upw.val().length < 5) {
			s.text('비밀번호는 6자 이상 입력해 주세요.').css("color","red"); 
		} else if  (upw.val().length > 18) { 
			s.text('비밀번호는 18자 미만 입력해 주세요.').css("color","red");
		} else if (upw.val().length > 5 && upw.val().length < 18){ 
			s.text('').css("color","blue"); 
		}  
	});
	
	upw2.keyup( function() {
		var s = $(this).next('p');
		if (upw2.val().length == 0) {
			s.text('');
		}  else if (upw2.val().length < 5) {
			s.text('비밀번호는 6자 이상 입력해 주세요.').css("color","red"); 
		} else if (upw2.val().length > 18) { 
			s.text('비밀번호는 18자 미만 입력해 주세요.').css("color","red");
		} else if (upw2.val().length > 5 && upw2.val().length < 18 ){
			if ( upw.val() == upw2.val() ) {
				s.text('').css("color","blue"); 
			} else if ( upw.val() != upw2.val() ) {
				s.text('비밀번호가 맞지 않습니다.').css("color","red");
			}
			
		}  
	});
	
	usename.keyup( function() {
		var s = $(this).next('p');
		if (usename.val().length == 0) {
			s.text('');
		} else if (usename.val().length > 1 && usename.val().length < 18 ) { 
			s.text('').css("color","blue"); 
			 if (re_usename.test(usename.val()) == true) { 
					s.text('').css("color","blue");
				}
		} else if (usename.val().length > 18) { 
					s.text('이름이 너무 깁니다.').css("color","red");
		} else if (re_usename.test(usename.val()) != true) { 
			s.text('한글 또는 영문만 입력해 주세요.').css("color","red");
		}
	});
	
	
	usetel.keyup( function() {
		var s = $(this).next('p'); 
		if (usetel.val().length == 0) {
			s.text('');
		} else if (re_tel.test(usetel.val()) != true) { 
			s.text('숫자만 입력해 주세요.').css("color","red");
		} else if (re_tel.test(usetel.val()) == true) { 
			s.text('').css("color","blue");
		} else if (usetel.val().length > 16) {
			s.text('숫자가 너무 길어요.'); 
		} 
	});
	
});


/* 유효성검사 끝 */

/* 회원가입 이메일 */
$(".select_box_text .select_box_wrap select").change(function() {
	var select = ($(this).val());
	$(".select_box_text .select_box_wrap > div input").val(select).text();
});

/* 회원가입 이메일  끝 */

$(document).ready(function(){
    //최상단 체크박스 클릭
    $(".join_all input").click(function(){
        //클릭되었으면
        if($(".join_all input").prop("checked")){
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
            $(".checkbox_box_wrap3 input:checkbox").prop("checked",true);
            //클릭이 안되있으면
        }else{
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
            $(".checkbox_box_wrap3 input:checkbox").prop("checked",false);
        }
    })
})





/* 아아디찾기 */
$(document).ready(function(){
    $("#find_btn").click(function(){
    	var re_usemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   
    	var usemail = $('#find_email');
    	
    	
    	if ($("#find_name").val() == ""){
    		alertify.warning("이름을 입력해 주세요.");
    		return false;
    	}else if ($("#find_email").val() == "" ){
    		alertify.warning("이메일을 입력해 주세요.");
    		return false;
    	} else if (re_usemail.test(usemail.val()) != true) { 
    		alertify.warning("잘못된 이메일주소입니다.");
    	} else{
    		$(".find_wrap .select_box_text input[disabled=disabled]").prop("disabled", false);
    	}
    	
    });
});

$(document).ready(function(){
    $("#find input[type='button']").click(function(){
    	var re_usemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   
    	var usemail = $('#find_email');
    	
    	if ($("#find_email").val() == "" ){
    		alertify.warning("이메일을 입력해 주세요.");
    		return false;
    	} else if (re_usemail.test(usemail.val()) != true) { 
    		alertify.warning("잘못된 이메일주소입니다.");
    	} else if ($("#find_confirm").val() == "" ){
    		alertify.warning("인증번호를 입력해 주세요.");
    		return false;
    	} else if ( $("#find_confirm").val() != "111111" ) { 
    		alertify.warning("잘못된 인증번호입니다.");
    	} else{
    		location.replace('idfind_confirm.html');
    	}
    	
    });
});
/* 아아디찾기 끝 */


/* 비번찾기 */
$(document).ready(function(){
    $("#find2 input[type='button']").click(function(){
    	var re_usemail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;   
    	var usemail = $('#find_email2');
    	
    	if ($("#find_email2").val() == "" ){
    		alertify.warning("이메일을 입력해 주세요.");
    		return false;
    	} else if (re_usemail.test(usemail.val()) != true) { 
    		alertify.warning("잘못된 이메일주소입니다.");
    	} else{
    		location.replace('idfind_pass.html');
    	}
    	
    });
});
/* 비번찾기  끝 */


/* 비번찾기 변경 */
$(document).ready(function(){
    $("#find_pass input[type='button']").click(function(){
    	if ($("#find_pass1").val() == "" ){
     		alertify.warning("비밀번호를 입력해주세요.");
     		return false;
     	} else if ($("#find_pass2").val() == "" ){
     		alertify.warning("비밀번호 확인을 입력해주세요.");
     		return false;
     	}  else if ($("#find_pass1").val().length < 6 ){
     		alertify.warning("비밀번호는 6자 이상 입력해 주세요.");
     		return false;
     	} else if ($("#find_pass1").val().length > 18 ){
     		alertify.warning("비밀번호는 18자 미만 입력해 주세요.");
     		return false;
     	} else if ($("#find_pass1").val() != $("#find_pass2").val() ){
    		alertify.warning("비밀번호가 맞지 않습니다.");
    		return false;
    	} else {
    		location.replace('../home/index.html');
    	}
    	
    });
});
/* 비번찾기  변경 끝 */

