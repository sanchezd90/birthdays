import * as SQLite from 'expo-sqlite'

const database = SQLite.openDatabase('birthdates.db')

export const init = () => {
    const promise = new Promise((resolve,reject)=>{        
        database.transaction((tx)=>{
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS contacts (
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
            tx.executeSql(`INSERT INTO contacts (id, firstName, lastName, birthdate, hasReminder) VALUES (?, ?, ?, ?, ?)`,
            [contact.id, contact.firstName,contact.lastName,contact.birthdate,contact.hasReminder],
            (_,result)=>{                
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
            tx.executeSql(`SELECT * FROM contacts`,
            [],
            (_,result)=>{
                
                const contacts = result.rows._array.map(contact=>{
                    return {
                        ...contact,
                        birthdate:contact.birthdate.split('T')[0],
                        hasReminder:contact.hasReminder!==0
                    }
                })                               
                resolve(contacts)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })

    return promise
}

export const fetchContact = (id) => {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`SELECT * FROM contacts WHERE id = ?`,
            [id],
            (_,result)=>{                
                const contact = {
                        ...result.rows._array[0],
                        birthdate:result.rows._array[0].birthdate.split('T')[0],
                        hasReminder:result.rows._array[0].hasReminder!==0
                    }                                     
                resolve(contact)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })

    return promise
}

export const updateContact = (contact) => {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`
            UPDATE contacts
            SET firstName = ?, lastName = ?, birthdate = ?, hasReminder = ?
            WHERE id = ?`,
            [contact.firstName,contact.lastName,contact.birthdate,contact.hasReminder, contact.id],
            (_,result)=>{                               
                resolve(result)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })
}

export const deleteContact = (id) => {
    const promise = new Promise((resolve,reject)=>{
        database.transaction((tx)=>{
            tx.executeSql(`
            DELETE FROM contacts            
            WHERE id = ?`,
            [id],
            (_,result)=>{                     
                resolve(result)
            },
            (_,error)=>{
                reject(error)
            }
            )
        })
    })
}