import express  from "express";
import cors from 'cors'
const app = express();

app.use(express.json())
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
      }
]

const requestLogger = (request, response, next) => {
    console.log('Method', request.method)
    console.log('Path', request.path)
    console.log('Body', request.body)
    console.log('-----')
    next()
}
// const unknownEndPoint = (request, response) => {
//     response.status(404).send({error: 'unknown endpoint'})
// }

app.use(requestLogger)
//app.use(unknownEndPoint)

app.get('/', (request, response) => {
    response.send('<h1>HELLOOOOOOOO</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => note.id === id)
    
    if (note){
        response.json(note) 
    }  else{
        response.status(404).end()
    }
})

app.post('/api/notes', (request, response) => {

    const maxId = notes.length > 0 ?
     Math.max(...notes.map(num => num.id)) :
     0

     if(!request.body){
        return response.status(400).json({ error: 'Content missing'})
     }

    const note = request.body;
    note.id = maxId + 1;

    notes = notes.concat(note)
    console.log(note)

    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.filter(note => note.id !== id)

    response.status(204).end()

})

const PORT  = 4001;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} `)
})