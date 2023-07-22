"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const bookUtil_1 = require("./bookUtil");
const socket_io_client_1 = require("socket.io-client");
const axios_1 = require("axios");
const instance = axios_1.default.create({
    baseURL: 'https://meamoe.one/koa',
    timeout: 100000,
});
instance.get('/newCen/free/testExten').then((res) => {
    console.log(`res`, res.data.msg);
});
const socket = socket_io_client_1.io('wss://meamoe.ml', {
    transports: ["websocket"],
    reconnectionDelayMax: 10000,
    reconnectionDelay: 5000,
    forceNew: true
});
let bs = bookUtil_1.buildSocket(socket);
console.log(`sese`);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // socket.connect()
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "thief-book" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // 老板键
    let displayCode = vscode_1.commands.registerCommand('extension.displayCode', () => {
        let lauage_arr_list = [
            'Java - System.out.println("Hello World");',
            'C++ - cout << "Hello, world!" << endl;',
            'C - printf("Hello, World!");',
            'Python - print("Hello, World!")',
            'PHP - echo "Hello World!";',
            'Ruby - puts "Hello World!";',
            'Perl - print "Hello, World!";',
            'Lua - print("Hello World!")',
            'Scala - println("Hello, world!")',
            'Golang - fmt.Println("Hello, World!")'
        ];
        var index = Math.floor((Math.random() * lauage_arr_list.length));
        vscode_1.window.setStatusBarMessage(lauage_arr_list[index]);
    });
    // 下一页
    let getNextPage = vscode_1.commands.registerCommand('extension.getNextPage', () => {
        bs.curPageRef.currnet++;
        if (bs.slicePageNum.currnet >= bs.curPageRef.currnet) {
            bs.nextPage();
            return;
        }
        bs.stateRef.current = 'next';
        socket.emit('nextPage');
        // instance.get('/newCen/free/testExten').then((res) => {
        // 	console.log(`res`,res.data.msg);
        // })
    });
    // 上一页
    let getPreviousPage = vscode_1.commands.registerCommand('extension.getPreviousPage', () => {
        bs.curPageRef.currnet--;
        if (bs.curPageRef.currnet >= 1) {
            bs.prevPage();
            return;
        }
        bs.stateRef.current = 'prev';
        socket.emit('prevPage');
    });
    // 跳转某个页面
    let getJumpingPage = vscode_1.commands.registerCommand('extension.getJumpingPage', () => {
        // socket.emit('prevPage',workspace.getConfiguration().get('thiefBook.currPageNumber'))
    });
    context.subscriptions.push(displayCode);
    context.subscriptions.push(getNextPage);
    context.subscriptions.push(getPreviousPage);
    context.subscriptions.push(getJumpingPage);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map