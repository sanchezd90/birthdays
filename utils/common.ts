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

export const getDayNumberFromString = (date:string) => {        
    return parseInt(date.split('-')[2])
} 

export const groupByMonth = (contactList:Array<IContact>) => {   
    const currentMonth = new Date().getMonth()     
    const thisYearList = []
    const nextYearList = []
    months.map((month)=>{
        if(parseInt(month.id)<=currentMonth){
            nextYearList.push({
                ...month,
                data:contactList.filter(contact=>belongsToMonth(month.id,contact.birthdate)).sort((a, b) => getDayNumberFromString(a.birthdate) - getDayNumberFromString(b.birthdate))
            })
        }else{
            thisYearList.push({
                ...month,
                data:contactList.filter(contact=>belongsToMonth(month.id,contact.birthdate)).sort((a, b) => getDayNumberFromString(a.birthdate) - getDayNumberFromString(b.birthdate))
            })
        }
    })

    return thisYearList.concat(nextYearList) 
}

export const parseDay = (date:string) => {    
    return date.split('-')[2][0]==='0'?date.split('-')[2][1]:date.split('-')[2]
}

export const calculateAge = (birthDate) => {
    const now = new Date();
    const dob = new Date(birthDate);
  
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      age--;
    }
  
    return age;
  }

export const twoDigitNumber = (number) => {
    if (number < 10) {
        return '0' + number.toString();
      } else {
        return number.toString();
      }
}

  export const parseImportedContacts = (importedContacts) => {    
    const newContacts = []
    importedContacts.map((contact,index)=>{
        if(contact.birthday){            
            const birthdayString = contact.birthday ? `${contact.birthday.year}-${twoDigitNumber(contact.birthday.month+1)}-${twoDigitNumber(contact.birthday.day)}`: null
            newContacts.push({
                id:`${Date.now().toString()}${index}`,
                importedId:contact.id,
                firstName:contact.firstName,
                lastName:contact.lastName,
                birthdate:birthdayString,
                hasReminder:true
            })
        }
    })
    return newContacts
  }