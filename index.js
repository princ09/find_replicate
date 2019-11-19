const path = require('path');
const http = require('http');
const fs = require('fs');
var url = require('url');
const dirTree = require("directory-tree");
const basename = __dirname;
/**
 * Change Directory name to get json structure of that Directory 
 */
const config_file_tree = dirTree(basename + '/config');
/* For Filter
const filteredTree = dirTree("/some/path", { extensions: /\.txt/ });
*/
const temp_file_tree = dirTree(basename + '/temp');
const common_file = [];
const hname = 'localhost';
const pname = 3000;
for (let i = 0; i < temp_file_tree.children.length; i++) {
    for (let j = 0; j < config_file_tree.children.length; j++) {

        if (temp_file_tree.children[i].name === config_file_tree.children[j].name) {
            common_file.push(temp_file_tree.children[i]);
            config_file_tree.children[j].backup = true;
        }
    }
}
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    var q = url.parse(req.url, true);

    /*The parse method returns an object containing url properties*/
    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);

    /*The query property returns an object with all the querystring parameters as properties:*/
    var qdata = q.query;
    console.log(qdata.file);
    if (req.method == 'GET') {
        if (req.url == '/') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>server connection sucess:)</h1></body></html>');
        } else if (req.url == '/config') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(config_file_tree.children));
        } else if (req.url == '/temp') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(temp_file_tree.children));
        } else if (req.url == '/common') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(common_file));
        } else if (req.url === '/favicon.ico') {
            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
            res.end();
            return;
        } else {
            var jsonfile_path = basename + q.pathname + '/' + qdata.file;
            if(fs.existsSync(jsonfile_path)){
                json_file = require(jsonfile_path);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(json_file));
            }else{
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>file Not Found</h1></body></html>');
            }
           
        }
    } else {

        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>server connection sucess , Request for File</h1></body></html>');
    }

});

server.listen(pname, hname, () => {
    console.log(`server running at http://${hname}:${pname}`);

});