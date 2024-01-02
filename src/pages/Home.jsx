import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import { context, server } from "../main";
import toast from "react-hot-toast";
import { Todoitem } from "./Todoitem";
import Login from "./Login";

export default function Home () {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [loading,setLoading] = useState(false);
    const [tasks,setTasks] = useState([]);

  const {isAuthenticated,setIsAuthenticated} = useContext(context);

    useEffect(() => {
        axios.get(`${server}/task/mytasks`,{
            withCredentials: true
        }).then((res) => {
        setTasks(res.data.tasks);
        // console.log(res.data.tasks);
            
    }).catch( (err) => console.log('error occured'))
    },[tasks]);

    async function updateHandler(e){
        try{
            const {data} = await axios.put(`${server}/task/${e}`,{},{
                withCredentials: true
            });
            console.log(data);
            toast.success(data.message);

        }
        catch(err){
            console.log(err)
            toast.error(err.response.data.message);
        }
    }

    async function deleteHandler(e){
        try{
            const {data} = await axios.delete(`${server}/task/${e}`,{
                withCredentials: true
            });
            toast.success(data.message);

        }
        catch(err){
            toast.error(err.response.data.message);
        }
     }

    async function submitHandler(e){
        e.preventDefault();
        setLoading(true);
        try{
            const {data} = await axios.post(`${server}/task/new`,{
                title,description
            },
            {
                withCredentials: true,
                headers: {'Content-Type': 'application/json'}
            })

            toast.success(data.message);
            setLoading(false)
            setTitle('')
            setDescription('')
        }catch(err){
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }

  if(!isAuthenticated) return <Navigate to={"/login"}/>

    return (
    <>
    <div className='login'>
        <form onSubmit={submitHandler}>

            <input type="text" required placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" required placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button disabled={loading} type="submit">Add</button>
        </form>
         
    </div>

    <div 
    style={{display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
      flexDirection: 'column',
      marginTop: 15
      }}>
      {  tasks.map((i) => (
            <Todoitem 
            key={i._id} 
            id={i._id} 
            title={i.title} 
            description={i.description} 
            isCompleted={i.isCompleted}
            update={updateHandler}
            delete={deleteHandler}  />
        ))
      }
    </div>
    
    </>
)} 