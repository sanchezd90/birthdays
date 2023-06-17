import { IContact } from "../interfaces/contacts";

export const months = [
    {id:'1',name:'Januar'},
    {id:'2',name:'Februar'},
    {id:'3',name:'März'},
    {id:'4',name:'April'},
    {id:'5',name:'Mai'},
    {id:'6',name:'Juni'},
    {id:'7',name:'Juli'},
    {id:'8',name:'August'},
    {id:'9',name:'September'},
    {id:'10',name:'Oktober'},
    {id:'11',name:'November'},
    {id:'12',name:'Dezember'},
]

export const belongsToMonth = (targetMonth:string,date:string) => {
    let month = date.split('-')[1]
    if(month[0]==='0') month=month[1]
    return targetMonth===month
}

export const groupByMonth = (contactList:Array<IContact>) => {        
    const groupedList = months.map((month)=>{
        return {
            ...month,
            data:contactList.filter(contact=>belongsToMonth(month.id,contact.birthdate))
        }
    })
    return groupedList 
}

export const parseDay = (date:string) => {    
    return date.split('-')[2][0]==='0'?date.split('-')[2][1]:date.split('-')[2]
}