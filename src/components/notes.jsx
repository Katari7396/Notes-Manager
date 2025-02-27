import { Box, Button, Card, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Notes() {

    const [notes, setNotes] = useState({tittle:'', description:''})
    const [addNotes, setAddNotes] = useState([])
    // const [editNotes, setEditNotes] = useState('')
    const [editIndex, setEditIndex] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

    const handleAdd = () => {

        if(notes.tittle && notes.description) {
            setAddNotes([...addNotes, notes])
            setNotes({tittle:'', description:''})
        }

    }

    const handleEdit = (index) => {

        setIsEditing(true);
        setEditIndex(index);
        setNotes({ tittle: addNotes[index].tittle, description: addNotes[index].description });

    }

    const handleSave = () => {

    const updatedNotes = [...addNotes];
    updatedNotes[editIndex] = notes;
    setAddNotes(updatedNotes);
    setIsEditing(false);
    setEditIndex(null);
    setNotes({ tittle: '', description: '' });

    };

    const handleDelete = (index) =>{
        setAddNotes(prevNotes => {
            const newNotes= []
            for(let i = 0; i < prevNotes.length; i++ ){
                if(i !== index){
                    newNotes.push(prevNotes[i])
                }
            }
            return newNotes;
        })
    }

  return (
    <Box sx={{padding:'20px'}}>
        <Typography variant='h5'>Notes Manager</Typography>
        <TextField 
            label = 'Tittle'
            variant='outlined' fullWidth
            value={notes.tittle}
            onChange={(e)=>setNotes({...notes, tittle:e.target.value})}
            style={{marginTop:'15px', marginBottom:'20px'}}
        />
        <TextField 
            label = 'Description'
            variant='outlined' fullWidth
            value={notes.description}
            onChange={(e)=>setNotes({...notes, description:e.target.value})}
            style={{marginBottom:'20px'}}
        />
        <Button variant='contained' color='secondary' 
                onClick={isEditing ? handleSave : handleAdd}>
            {isEditing ? 'Save Changes' : 'Add Notes'}
        </Button>

        <Grid container spacing={2} style={{marginTop:'20px'}}>
            {addNotes.map((note, index)=>(
                <Grid key={index} style={{width:'20%'}}>
                    <Card style={{padding:'10px'}}>
                        <Typography variant='h6'>Tittle: {note.tittle}</Typography>
                        <Typography variant='h6'>Description: {note.description}</Typography>
                    </Card>

                    <div style={{marginTop:'10px', display:'flex',gap:5}}>
                        <IconButton onClick={()=> handleEdit(index)} color='primary'>
                            <EditIcon/>
                        </IconButton>
                        <IconButton onClick={()=> handleDelete(index)} color='error'>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </Grid>
            ))}
            
        </Grid>
    </Box>
  )
}

export default Notes
