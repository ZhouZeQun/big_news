// 入口函数
$(function() {
// 点击事件
$('#goReg').on('click',function() {
   $('.reg-wrap').show()
   $('.login-wrap').hide()
})
$('#gologin').on('click',function() {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
 })
//  自定义验证表单
let form = layui.form
let layer = layui.layer
form.verify({
   psd : [
      /^[\S]{6,12}$/
      ,'密码必须6到12位,且不能出现空格'
    ] ,
    repsd : function(value) {
      let psd = $('.reg-wrap [name="password"]').val()
      if(psd!==value) {
         return '两次密码不一致'
      }
    }
})

// 监听注册提交事件
$('#form_reg').on('submit',function(e) {
   e.preventDefault()
// 注册请求api
$.ajax({
   method: 'POST',
   url: 'http://www.liulongbin.top:3007/api/reguser',
   data: {
      username: $('.reg-wrap [name=username]').val(),
   password: $('.reg-wrap [name=password]').val()
   },
   success(res) {
      if(res.status!==0) {
         return layer.msg(res.message);
      }
      layer.msg('注册成功');
      // 模拟点击事件
      $('#gologin').click()
   }
})

})

// 监听登录提交事件
$('#form_login').on('submit',function(e) {
   e.preventDefault()
   $.ajax({
      method: 'POST',
      url: 'http://www.liulongbin.top:3007/api/login',
      data: $(this).serialize(),
      success(res) {
         if(res.status!==0) {
            return layer.msg(res.message)
         }
         layer.msg('登录成功')
         // 将token存储到本地
         localStorage.setItem('token',res.token)
         // 跳转页面
         location.href = '/index.html'
      }
   })
})






})