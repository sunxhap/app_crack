



function callFun() {
    var result = "";
    Java.perform(function fn() {
        result = Java.use("com.xbiao.utils.net.NetContent").decryptResponse("fACJZ4ZLoQz1nrD9ZCuo0BaQaOl7kWuehTAiLjo+X42NaFi31Xvuq7pAJ97wYbD0Zf1OT6bNWxZIs7jl7/iHtuQVj5xmQVHFDk4c9cpWEsg=", "https://android.xbiao.com/apps/Androi\n" +
            "dXbiao/android-Xbiao-5_3-GOOGLE-1080_1794/user/sendCode/")
        // console.log(result)
    })
    return result
}
rpc.exports = {
    callfun: callFun
};