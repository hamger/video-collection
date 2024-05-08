
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/self/self","uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate","uni_modules/uni-id-pages/pages/userinfo/userinfo","uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile","uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage","uni_modules/uni-id-pages/pages/login/login-withoutpwd","uni_modules/uni-id-pages/pages/login/login-withpwd","uni_modules/uni-id-pages/pages/login/login-smscode","uni_modules/uni-id-pages/pages/register/register","uni_modules/uni-id-pages/pages/register/register-by-email","uni_modules/uni-id-pages/pages/retrieve/retrieve","uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email","uni_modules/uni-id-pages/pages/common/webview/webview","uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd","uni_modules/uni-id-pages/pages/register/register-admin","uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd","uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#888","selectedColor":"#0199FE","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/images/quanzi.png","selectedIconPath":"static/images/quanzi-fill.png"},{"pagePath":"pages/self/self","text":"我的","iconPath":"static/images/user.png","selectedIconPath":"static/images/user-fill.png"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"video-collection","compilerVersion":"4.14","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"资源列表"}},{"path":"/pages/self/self","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate","meta":{},"window":{"navigationBarTitleText":"注销账号"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile","meta":{},"window":{"navigationBarTitleText":"绑定手机号码"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/uni_modules/uni-id-pages/pages/login/login-withoutpwd","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/uni_modules/uni-id-pages/pages/login/login-withpwd","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/uni_modules/uni-id-pages/pages/login/login-smscode","meta":{},"window":{"navigationBarTitleText":"手机验证码登录"}},{"path":"/uni_modules/uni-id-pages/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/uni_modules/uni-id-pages/pages/register/register-by-email","meta":{},"window":{"navigationBarTitleText":"邮箱验证码注册"}},{"path":"/uni_modules/uni-id-pages/pages/retrieve/retrieve","meta":{},"window":{"navigationBarTitleText":"重置密码"}},{"path":"/uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email","meta":{},"window":{"navigationBarTitleText":"通过邮箱重置密码"}},{"path":"/uni_modules/uni-id-pages/pages/common/webview/webview","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":""}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"修改密码"}},{"path":"/uni_modules/uni-id-pages/pages/register/register-admin","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"注册管理员账号"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"设置密码"}},{"path":"/uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify","meta":{},"window":{"enablePullDownRefresh":false,"navigationBarTitleText":"实名认证"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});