const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');
const mariadb = require('./database/connect/mariadb');

async function main(res) {
    console.log('메인페이지');

    try {
        const [rows] = await mariadb.query("SELECT * FROM product");
    } catch (err) {
        console.error('Error fetching products:', err);
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(main_view);
    res.end();
}

function redRacket(res) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('Internal Server Error');
            res.end();
            return;
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

function blueRacket(res) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('Internal Server Error');
            res.end();
            return;
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

function blackRacket(res) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.write('Internal Server Error');
            res.end();
            return;
        }
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.write(data);
        res.end();
    });
}

async function order(res, productId) {
    console.log('productId', productId);
    res.writeHead(200, {'Content-Type': 'text/html'});

    try {
        const now = new Date().toLocaleDateString();
        const query = "INSERT INTO orderlist (productId, orderDate) VALUES (?, ?)";
        const [result] = await mariadb.query(query, [productId, now]);

        console.log('Order inserted:', result);
        res.write('Order page');
    } catch (err) {
        console.error('Error inserting order:', err);
        res.write('Internal Server Error');
    } finally {
        res.end();
    }
}


async function orderlist(res){
    console.log('orderlist');
    const data = (await mariadb.query("select * from orderlist"))[0];
    res.write(orderlist_view)
    data.forEach((element)=>{
        console.log(element.productId, element.orderDate)
        res.write("<tr>"
            +"<td>"+element.productId+"</td>"
            +"<td>"+element.orderDate+"</td>"
            +"</tr>"
        )
    })
    res.write("</table>")
    res.end();

}

let handle = {};
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;
