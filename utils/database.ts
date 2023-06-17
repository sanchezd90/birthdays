import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('birthdates.db')

export const init = () => {
    const promise = new Promise((resolve,reject)=>{        
        database.transaction((tx)=>{
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS contacts8 (
                    id TEXT PRIMARY KEY NOT NULL,
                    firstName TEXT NOT NULL,
                    lastName TEXT NOT NULL,
                    birthdate TEXT NOT NULL,
                    hasReminder INTEGER NOT NULL
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

export const insertContact = (contact) => {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`INSERT INTO contacts8 (id, firstName, lastName, birthdate, hasReminder) VALUES (?, ?, ?, ?, ?)`,
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

export const fetchContacts = () => {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM contacts8`,
            [],
            (_,result)=>{
                
                const contacts = result.rows._array.map(contact=>{
                    return {
                        ...contact,
                        birthdate:contact.birthdate.split('T')[0],
                        hasReminder:contact.hasReminder!==0
                    }
                })                
                resolve(result.rows._array)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })

    return promise
}