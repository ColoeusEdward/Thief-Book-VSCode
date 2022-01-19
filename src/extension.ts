// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window,workspace } from 'vscode';
import { buildSocket } from './bookUtil';
import { io, Socket } from "socket.io-client";
import axios from 'axios'
const instance = axios.create({
	baseURL: 'https://meamoe.ml/koa',
	timeout: 100000,
	// headers: {'X-Custom-Header': 'foobar'}
});
instance.get('/newCen/free/testExten').then((res) => {
	console.log(`res`, res.data.msg);
})
const socket: Socket = io('wss://meamoe.ml', {
	transports: ["websocket"]
	, reconnectionDelayMax: 10000
	, reconnectionDelay: 5000
	, forceNew: true
})
let bs = buildSocket(socket)
console.log(`sese`,);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {



	// socket.connect()
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "thief-book" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	// 老板键
	let displayCode = commands.registerCommand('extension.displayCode', () => {

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
		window.setStatusBarMessage(lauage_arr_list[index]);
	});

	// 下一页
	let getNextPage = commands.registerCommand('extension.getNextPage', () => {
		socket.emit('nextPage')
		// instance.get('/newCen/free/testExten').then((res) => {
		// 	console.log(`res`,res.data.msg);
		// })
	});

	// 上一页
	let getPreviousPage = commands.registerCommand('extension.getPreviousPage', () => {
		socket.emit('prevPage')
	});

	// 跳转某个页面
	let getJumpingPage = commands.registerCommand('extension.getJumpingPage', () => {
		// socket.emit('prevPage',workspace.getConfiguration().get('thiefBook.currPageNumber'))
	});

	context.subscriptions.push(displayCode);
	context.subscriptions.push(getNextPage);
	context.subscriptions.push(getPreviousPage);
	context.subscriptions.push(getJumpingPage);
}

// this method is called when your extension is deactivated
export function deactivate() { }
