const mysql = require('mysql2');

let dataQnA = {};

const refreshData = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'viktorina'
    });

    connection.connect();

    const sql = 'SELECT id, question, answer FROM question_answer ORDER BY RAND() LIMIT 1';

    connection.query(sql, (err, results) => {
        if (err) throw err;

        dataQnA = results;
        connection.end();
        console.log(dataQnA); 
        console.log(dataQnA[0].id);
        console.log(dataQnA[0].question);
        console.log(dataQnA[0].answer);

        setTimeout(refreshData, 10000);
    });
};
refreshData();

exports.refreshData = refreshData;
exports.dataQnA = dataQnA;




  