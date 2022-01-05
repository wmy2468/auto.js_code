function isDeviceLocked(){
    importClass(android.app.KeyguardManager)
    importClass(android.content.Context)

    var km = context.getSystemService(Context.KEYGUARD_SERVICE);
    console.log("is keyguard locked:"+km.isKeyguardLocked());
    console.log("is keyguard secure:"+km.isKeyguardSecure());
    return km.isKeyguardLocked()&&km.isKeyguardSecure();;
}

toast(isDeviceLocked());