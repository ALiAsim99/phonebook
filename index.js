const express=require('express')
const cors=require('cors')
const app=express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const morgan=require('morgan')
app.use(morgan('tiny'))

let persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.get("/info",(req,res)=>{
    res.send(`<p>Phonebook has info for ${persons.length}</p>`)
})
app.get("/api/persons",(req,res)=>{
    res.json(persons)
})
app.get("/api/persons/:id",(req,res)=>{
    const id=Number(req.params.id)
    
    const person=persons.find(p=>p.id==id)
    if(person){
    res.json(person)
    }else{
        res.status(404).end()
    }
})
const generateId=()=>{
    const id=Math.max(...persons.map(p=>p.id))
    return id+1;
}
app.post("/api/persons",(req,res)=>{
    const body=req.body;
    console.log(body)
    console.log('zzz')
    if(!body.name || !body.number){
        return res.status(400).json({error:"missing content"})
    }
    if(persons.find(p=>p.name==body.name)){
        return res.status(400).json({error:"user already entered"})
    }
    const newPersons={
        name:body.name,
        nunber:body.number,
        id:generateId()
    }
    res.json(persons.concat(newPersons))
})
app.delete("/api/persons/:id",(req,res)=>{
    const id=Number(req.params.id)
    persons=persons.filter(p=>p.id!=id)
    res.status(204).end()

})


const PORT=process.env.PORT||3001;
app.listen(PORT,()=>console.log(`running on port ${PORT}`))