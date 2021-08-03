
const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

class AppDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, err => {
            if (err) {
                console.log('Cant connect to the database. Err: ', err.message);
            } else {
                console.log('Successfully connected to the database.');
            }
        });
    }
    runquery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, (err) => {
                if (err) {
                    console.log('An error occured when runquery, Err: ', err.message);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Fail to get. Err: ', err.message);
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, results) => {
                if (err) {
                    console.log('Fail to get all. Err: ', err.message);
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    }
}

module.exports = AppDAO
