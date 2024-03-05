import { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/Posts';
import AddPost from './components/AddPost';
import Navbar from './components/navbar';

function App() {
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    fetchdata();
  },[]);

  async function fetchdata(){
    await fetch('https://jsonplaceholder.typicode.com/posts/')
      .then((response) => response.json())
      .then((json) => setPosts(json))
      .catch((error)=>{console.log(error)});
  }



  const onAdd=async function(title,body){
    // console.log(title,body);
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
      if (response.status!==201)
        return;
      else{
        return response.json();
      }
    }
    )
    .then((data) => setPosts((posts)=>[...posts,data]))
    .catch((error)=>console.log(error));
  }

  const handleEdit=async function(id,title,body){
    // console.log(id,title,body)
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title,
      body: body,
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
})
  .then((response) => response.json())
  .then((data) => {
    const updatePosts=posts.map((post)=>{
      if(post.id === id){
        post.title=title;
        post.body=body;
      }
      return post;
    })
    setPosts(updatePosts);
  })
  .catch((error)=>console.log(error));
  }

  const handleDelete=async function(id){
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
      })
      .then((response)=>{
        if (response.status !==200)
          return;
        else{
          setPosts(posts.filter((post)=>{return post.id!==id;}))
        }
      });
  }


  return (
    // <h1>Posts</h1>
    <>
      <Navbar/>
      <AddPost onAdd={onAdd}/>
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">body</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post)=>{return <Posts key={post.id} {...post} onEdit={handleEdit} ondelete={handleDelete}/>})}
        </tbody>
      </table>
    </>
  );
}

export default App;
