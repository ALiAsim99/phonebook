
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://ali99asim:${password}@cluster0.qker85a.mongodb.net/Person?retryWrites=true&w=majority
  `

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)
  
if(process.argv.length==3){
    Person.find({}).then(res=>{
        console.log('phonebook')
        res.forEach(r=>console.log(`${r.name} ${r.number}`))
        mongoose.connection.close()

    })
}else{

const person = new Person({
  name: process.argv[3],
  number:process.argv[4],
})

person.save().then(result => {
  console.log(`${result.name} added to phonebook`)
  mongoose.connection.close()
})
}