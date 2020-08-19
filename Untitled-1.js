function exec(action, args){
    args = args || {};
    engines.execScript(action.name, action + "(" + JSON.stringify(args) + ");\n" + action.toString());
}

//要执行的函数，是一个简单的加法
function add(args){
    toastLog(args.a + args.b);
}

//在新的脚本环境中执行 1 + 2
exec(add, {a: 1, b:2});