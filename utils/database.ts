import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('birthdates.db')

export function init() {
    const promise = new Promise((resolve,reject)=>{        
        database.transaction((tx)=>{
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS contacts5 (
                    id TEXT PRIMARY KEY NOT NULL,
                    firstName TEXT NOT NULL,
                    lastName TEXT NOT NULL,
                    birthdate TEXT NOT NULL,
                    hasReminder BOOLEAN NOT NULL
                )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        });
    })
    return promise
}

export function insertContact(contact) {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`INSERT INTO contacts5 (id, firstName, lastName, birthdate, hasReminder) VALUES (?, ?, ?, ?, ?)`,
            [contact.id, contact.firstName,contact.lastName,contact.birthdate,contact.hasReminder],
            (_,result)=>{
                console.log(result)
                resolve(result)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })
}