var settings = {
    e: 'idcode',
    codeType: {
        name: 'follow',
        len: 4
    }, //len是修改验证码长度的
    codeTip: '换个验证码?',
    inputID: 'idcode-btn' //验证元素的ID
};

var _set = {
    storeLable: 'codeval',
    store: '#ehong-code-input',
    codeval: '#ehong-code'
}
$.idcode = {
    getCode: function (option) {
        _commSetting(option);
        return _storeData(_set.storeLable, null);
    },
    setCode: function (option) {
        _commSetting(option);
        _setCodeStyle("#" + settings.e, settings.codeType.name, settings.codeType.len);

    },
    validateCode: function (option) {
        _commSetting(option);
        var inputV;
        if (settings.inputID) {
            inputV = $('#' + settings.inputID).val();

        } else {
            inputV = $(_set.store).val();
        }
        if (inputV.toUpperCase() == _storeData(_set.storeLable, null).toUpperCase()) { //修改的不区分大小写
            return true;
        } else {
            _setCodeStyle("#" + settings.e, settings.codeType.name, settings.codeType.len);
            return false;
        }
    }
};

function _commSetting(option) {
    $.extend(settings, option);
}

function _storeData(dataLabel, data) {
    var store = $(_set.codeval).get(0);
    if (data) {
        $.data(store, dataLabel, data);
    } else {
        return $.data(store, dataLabel);
    }
}

function _setCodeStyle(eid, codeType, codeLength) {
    var codeObj = _createCode(settings.codeType.name, settings.codeType.len);
    var randNum = Math.floor(Math.random() * 6);
    var htmlCode = ''
    if (!settings.inputID) {
        htmlCode = '<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
    }
    htmlCode += '<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
    htmlCode += String(randNum);
    htmlCode += '" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false" onclick="$.idcode.setCode()">' + _setStyle(codeObj) + '</div>' + '<span id="ehong-code-tip-ck" class="ehong-code-val-tip" onclick="$.idcode.setCode()">' + settings.codeTip + '</span>';
    $(eid).html(htmlCode);
    _storeData(_set.storeLable, codeObj);
}

function _setStyle(codeObj) {
    var fnCodeObj = new Array();
    var col = new Array('#BF0C43', '#E69A2A', '#707F02', '#18975F', '#BC3087', '#73C841', '#780320', '#90719B', '#1F72D8', '#D6A03C', '#6B486E', '#243F5F', '#16BDB5');
    var charIndex;
    for (var i = 0; i < codeObj.length; i++) {
        charIndex = Math.floor(Math.random() * col.length);
        fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
    }
    return fnCodeObj.join('');
}

function _createCode(codeType, codeLength) {
    var codeObj;
    if (codeType == 'follow') {
        codeObj = _createCodeFollow(codeLength);
    } else if (codeType == 'calc') {
        codeObj = _createCodeCalc(codeLength);
    } else {
        codeObj = "";
    }
    return codeObj;
}

function _createCodeCalc(codeLength) {
    var code1, code2, codeResult;
    var selectChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var charIndex;
    for (var i = 0; i < codeLength; i++) {
        charIndex = Math.floor(Math.random() * selectChar.length);
        code1 += selectChar[charIndex];

        charIndex = Math.floor(Math.random() * selectChar.length);
        code2 += selectChar[charIndex];
    }
    return [parseInt(code1), parseInt(code2), parseInt(code1) + parseInt(code2)];
}

function _createCodeFollow(codeLength) {
    var code = "";
    var selectChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

    for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * selectChar.length);
        if (charIndex % 2 == 0) {
            code += selectChar[charIndex].toLowerCase();
        } else {
            code += selectChar[charIndex];
        }
    }
    return code;
}
var regUsername = /^[a-zA-Z_][a-zA-Z0-9_]{4,19}$/;
var regPasswordSpecial = /[~!@#%&=;':",./<>_\}\]\-\$\(\)\*\+\.\[\?\\\^\{\|]/;
var regPasswordAlpha = /[a-zA-Z]/;
var regPasswordNum = /[0-9]/;
var password;
var check = [false, false, false, false, false, false];

//校验成功函数
function success(Obj, counter) {
    Obj.parent().parent().removeClass('has-error').addClass('has-success');
    $('.tips').eq(counter).hide();
    $('.glyphicon-ok').eq(counter).show();
    $('.glyphicon-remove').eq(counter).hide();
    check[counter] = true;

}

// 校验失败函数
function fail(Obj, counter, msg) {
    Obj.parent().parent().removeClass('has-success').addClass('has-error');
    $('.glyphicon-remove').eq(counter).show();
    $('.glyphicon-ok').eq(counter).hide();
    $('.tips').eq(counter).text(msg).show();
    check[counter] = false;
}

// 用户名匹配
$('.modal').find('input').eq(0).change(function () {


    if (regUsername.test($(this).val())) {
        success($(this), 0);
    } else if ($(this).val().length < 5) {
        fail($(this), 0, '用户名太短，不能少于5个字符');
    } else {
        fail($(this), 0, '用户名只能为英文数字和下划线,且不能以数字开头')
    }

});



// 密码匹配

// 匹配字母、数字、特殊字符至少两种的函数
function atLeastTwo(password) {
    var a = regPasswordSpecial.test(password) ? 1 : 0;
    var b = regPasswordAlpha.test(password) ? 1 : 0;
    var c = regPasswordNum.test(password) ? 1 : 0;
    return a + b + c;

}

$('.modal').find('input').eq(1).change(function () {

    password = $(this).val();

    if ($(this).val().length < 8) {
        fail($(this), 1, '密码太短，不能少于8个字符');
    } else {


        if (atLeastTwo($(this).val()) < 2) {
            fail($(this), 1, '密码中至少包含字母、数字、特殊字符的两种')
        } else {
            success($(this), 1);
        }
    }
});


// 再次输入密码校验
$('.modal').find('input').eq(2).change(function () {

    if ($(this).val() == password) {
        success($(this), 2);
    } else {

        fail($(this), 2, '两次输入的密码不一致');
    }

});


// 验证码
$.idcode.setCode();

$('.modal').find('input').eq(3).change(function () {
    var IsBy = $.idcode.validateCode();
    if (IsBy) {
        success($(this), 3);
    } else {
        fail($(this), 3, '验证码输入错误');
    }
});

// 手机号码
var regPhoneNum = /^[0-9]{11}$/
$('.modal').find('input').eq(4).change(function () {
    if (regPhoneNum.test($(this).val())) {
        success($(this), 4);
    } else {
        fail($(this), 4, '手机号码只能为11位数字');
    }
});

//短信验证码
var regMsg = /111111/;
$('.modal').find('input').eq(5).change(function () {
    if (check[4]) {
        if (regMsg.test($(this).val())) {
            success($(this), 5);
        } else {
            fail($(this), 5, '短信验证码错误');
        }
    } else {
        $('.modal').find('input').eq(4).parent().parent().removeClass('has-success').addClass('has-error');
    }

});


$('#loadingButton').click(function () {//点击获取短信验证码

    if (check[4]) {
        $(this).removeClass('btn-primary').addClass('disabled');

        $(this).html('<span class="red">59</span> 秒后重新获取');
        var secondObj = $('#loadingButton').find('span');
        var secondObjVal = secondObj.text();

        function secondCounter() {

            var secondTimer = setTimeout(function () {//重新获取短信验证码的倒计时
                secondObjVal--;
                secondObj.text(secondObjVal);
                secondCounter();
            }, 1000);
            if (secondObjVal == 0) {//重新获取短信验证码样式
                clearTimeout(secondTimer);
                $('#loadingButton').text('重新获取校验码');
                $('#loadingButton').removeClass('disabled').addClass('btn-primary');
                
            }
        }

        secondCounter();
    } else {
        $('.modal').find('input').eq(4).parent().parent().removeClass('has-success').addClass('has-error');
    }
    $('#idcode-btn1').val(111111);

})
// 点击显示
$('.register').click(function (e) {
    $('#register').show();
})
$('.login').click(function () {
    $('#login').show();
})
// 点击关闭
$('.close').click(function () {
    $('#register').hide();
    $('#login').hide();
})
// 点击切换
$('.tab-login').click(function () {
    $('#register').hide();
    $('#login').show();
})
$('.tab-register').click(function () {
    $('#register').show();
    $('#login').hide();
})
// 取消按钮
$('.cancel').click(function(){
    $('#login').hide();
})

$('#submit').click(function () {//立即注册
    if (!check.every(function (value) {
        return value == true;
    })) {
        console.log('注册失败');
        for (key in check) {
            if (!check[key]) {
                $('.modal').find('input').eq(key).parent().parent().removeClass('has-success').addClass('has-error');//提示错误的样式
            }
        }
    } else {//注册成功通过ajax把数据传给后台
        // console.log('注册成功');
        // console.log($('#username').val());
        // console.log($('#password').val());
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {//保存用户名密码电话
                username: $('#username').val(),
                password: $('#password').val(),
                repassword: $('#passwordConfirm').val(),
            },
            dataType: 'json',
            success: function (result) {
                console.log(result.code);
                if (result.code == 0) {
                    //注册成功
                    var r = confirm('注册成功,是否现在登录');
                    if (r == true) {
                        setTimeout(function () {
                            $('#register').hide();
                            $('#login').show();
                        }, 1000)
                    }
                }
                if (result.code == 4){
                    //账户已经存在
                    alert(result.message);
                }
            }
        })
    }
});

$('#reset').click(function () {//重置
    $('input').slice(0, 6).parent().parent().removeClass('has-error has-success');
    $('.tips').hide();
    $('.glyphicon-ok').hide();
    $('.glyphicon-remove').hide();
    check = [false, false, false, false, false, false,];
});

// 点击登录
$('#userInfoLogin').click(function () {
    console.log('点击了')
    $.ajax({
        type: 'post',
        url: '/api/user/login',
        data: {
            username: $('#userLogin').val(),
            password: $('#userPwd').val(),
        },
        dataType: 'json',
        success: function (result) {
            console.log(result);
            if (result.code == 0) {
                // alert('登录成功');
                // $("#login").hide();
                window.location.reload();//重载页面
                //显示登录用户的信息
                // $('.register').html(result.userInfo.username);
                // $('.register').removeClass('register');
                // $('.login').html('退出');
            } else if (result.code == 1) {
                alert('用户名或密码不能为空');
            } else if (result.code == 2) {
                alert('用户名或者密码错误')
            }
        }


    })

})

//退出登录
$('#logout').click(function(){
    // console.log(323);
    $.ajax({
        url:'/api/user/logout',
        success:function(result){
            if(!result.code){
                window.location.reload();//重载页面
            }
        }
    })
})

// 画布
$(function() {
	var canvas = $('#canvas')[0];
	canvas.width = $(window).width();
	canvas.height = 250 ;
	var ctx = canvas.getContext('2d');

	// init
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	// objects
	var listFire = [];
	var listFirework = [];
	var fireNumber = 10;
	var center = { x: canvas.width/8, y: canvas.height / 1.5 };//调位置
	var range = 100;
	for (var i = 0; i < fireNumber; i++) {
		var fire = {
			x: Math.random() * range / 2 - range / 4 + center.x,
			y: Math.random() * range * 2 + canvas.height,
			size: Math.random() + 0.5,
			fill: '#fd1',
			vx: Math.random() - 0.5,
			vy: -(Math.random() + 4),
			ax: Math.random() * 0.02 - 0.01,
			far: Math.random() * range + (center.y - range)
		};
		fire.base = {
			x: fire.x,
			y: fire.y,
			vx: fire.vx
		};
		//
		listFire.push(fire);
	}

	function randColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var color = 'rgb($r, $g, $b)';
		color = color.replace('$r', r);
		color = color.replace('$g', g);
		color = color.replace('$b', b);
		return color;
	}

	(function loop() {
		requestAnimationFrame(loop);
		update();
		draw();
	})();

	function update() {
		for (var i = 0; i < listFire.length; i++) {
			var fire = listFire[i];
			//
			if (fire.y <= fire.far) {
				// case add firework
				var color = randColor();
				for (var i = 0; i < fireNumber * 5; i++) {
					var firework = {
						x: fire.x,
						y: fire.y,
						size: Math.random() + 1.5,
						fill: color,
						vx: Math.random() * 5 - 2.5,
						vy: Math.random() * -5 + 1.5,
						ay: 0.05,
						alpha: 1,
						life: Math.round(Math.random() * range / 2) + range / 2
					};
					firework.base = {
						life: firework.life,
						size: firework.size
					};
					listFirework.push(firework);
				}
				// reset
				fire.y = fire.base.y;
				fire.x = fire.base.x;
				fire.vx = fire.base.vx;
				fire.ax = Math.random() * 0.02 - 0.01;
			}
			//
			fire.x += fire.vx;
			fire.y += fire.vy;
			fire.vx += fire.ax;
		}

		for (var i = listFirework.length - 1; i >= 0; i--) {
			var firework = listFirework[i];
			if (firework) {
				firework.x += firework.vx;
				firework.y += firework.vy;
				firework.vy += firework.ay;
				firework.alpha = firework.life / firework.base.life;
				firework.size = firework.alpha * firework.base.size;
				firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
				//
				firework.life--;
				if (firework.life <= 0) {
					listFirework.splice(i, 1);
				}
			}
		}
	}

	function draw() {
		// clear
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 0.18;
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// re-draw
		ctx.globalCompositeOperation = 'screen';
		ctx.globalAlpha = 1;
		for (var i = 0; i < listFire.length; i++) {
			var fire = listFire[i];
			ctx.beginPath();
			ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = fire.fill;
			ctx.fill();
		}

		for (var i = 0; i < listFirework.length; i++) {
			var firework = listFirework[i];
			ctx.globalAlpha = firework.alpha;
			ctx.beginPath();
			ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fillStyle = firework.fill;
			ctx.fill();
		}
	}
})
//吸顶
$(function(){
    $(window).scroll(function(){
        if($(document).scrollTop()>=250){
            $('.navbar-inverse').css("position","fixed");
        }else{
            // console.log("fdfds")
            $('.navbar-inverse').css("position","relative")
        }
    })
})

//返回顶部
// 默认速度
$(function() {  
    $(window).scroll(function(){
        if($(document).scrollTop()>=650){
            $('#gotop1').css("display","block");
        }else{
            // console.log("fdfds")
            $('#gotop1').css("display","none");
        }
    })
    // 返回顶部，绑定gotop1图标
    $("#gotop1").click(function(e) {
       TweenMax.to(window, 1.5, {scrollTo:0, ease: Expo.easeInOut});
       var huojian = new TimelineLite();
        huojian.to("#gotop1", 1, {rotationY:720, scale:0.6, y:"+=40", ease:  Power4.easeOut})
        .to("#gotop1", 1, {y:-1000, opacity:0, ease:  Power4.easeOut}, 0.6)
        .to("#gotop1", 1, {y:0, rotationY:0, opacity:1, scale:1, ease: Expo.easeOut, clearProps: "all"}, "1.4");
     });
    
 
    
    });