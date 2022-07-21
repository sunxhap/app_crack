

// 打印调用栈
function printstack() {
    console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()))
}

function hookclass(className){
    var Myclasa = Java.use(className);
    //得到类下的所有方法
    var methods = Myclasa.class.getDeclaredMethods();
    //遍历所有方法
    methods.forEach(function(method){
        //获得方法名
        var methodName = method.getName();
        //获得该方法得所有重载 Hook动态加载的dex
        var overloads = Myclasa[methodName].overloads;
        //遍历重载
        overloads.forEach(function(overload){
            //hook 重载
            var prot = '(';
            for (var i=0; i<overload.argumentTypes.length; i++){
                prot += overload.argumentTypes[i].className + ','
            }
            prot += ')';
            var wMethodName = className+'.'+methodName+prot;

            console.log('fffffffffffff');
            overload.implementation = function(){
                printstack();
                console.log(wMethodName);
                for (var i=0; i<arguments.length;i++){
                    console.log('argument:'+JSON.stringify(arguments[i]))
                }
                var ret = this[methodName].apply(this, arguments);
                // console.log(wMethodName + 'return:'+ JSON.stringify(ret));
                console.log(wMethodName + 'return:'+ ret);
                return ret
            }
        })
    })
}


function travel(className){
    var NetContent = Java.use(className);
    //1.得到这个类下面的所有方法
    var Methods = NetContent.class.getDeclaredMethods();
    //2.遍历所有的方法
    Methods.forEach(function(Method){
        //得到这个方法的所有重载 ovelroads
        var methodName = Method.getName();
        var overloads = NetContent[methodName].overloads;
        //遍历重载
        overloads.forEach(function(overload){

            var prot = '(';
            overload.argumentTypes.forEach(function(argumentType){
                prot += argumentType.className+','
            });
            prot+=')';

            overload.implementation = function(){
                console.log('----------------------------------');
                console.log(className+'.'+methodName+prot);

                printstack();
                for(var i = 0; i<arguments.length; i++){
                    console.log('argument:'+JSON.stringify(arguments[i]))
                }

                var ret = this[methodName].apply(this, arguments);
                console.log(methodName + 'return:'+JSON.stringify(ret));
                return ret
            }
        })
    })
}

function main_test() {
    console.log("Enter the Script!");
    Java.perform(function x() {
        hookclass('com.xbiao.utils.net.NetContent')
        // travel('com.xbiao.utils.net.NetContent')
    })
}


// hook 解密
function main_response() {
    console.log("Enter the Script!");
    Java.perform(function x() {
        console.log('enter')

        // var NetContent = Java.use("com.xbiao.utils.net.NetContent");
        // NetContent["decryptResponse"].implementation = function (str, str2) {
        //     console.log('decryptResponse is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
        //     var ret = this.decryptResponse(str, str2);
        //     console.log('decryptResponse ret value is ' + ret);
        //     return ret;
        // };

        // var AESedeUtil = Java.use("com.xbiao.utils.AESedeUtil");
        // AESedeUtil["decrypt"].implementation = function (str, str2) {
        //     console.log('decrypt is called' + ', ' + 'str: ' + str + ', ' + 'str2: ' + str2);
        //     var ret = this.decrypt(str, str2);
        //     console.log('decrypt ret value is ' + ret);
        //     return ret;
        // };

        var LocalCookieManager = Java.use("com.xbiao.manager.LocalCookieManager");
        LocalCookieManager["subCookieSecretKey"].implementation = function (str) {
            console.log('subCookieSecretKey is called' + ', ' + 'str: ' + str);
            var ret = this.subCookieSecretKey(str);
            console.log('subCookieSecretKey ret value is ' + ret);
            return ret;
        };

    })
}

setImmediate(main_response);