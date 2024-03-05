import React from 'react'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

export default function AddPost({onAdd}) {
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        onAdd(e.target.title.value,e.target.body.value);
        e.target.title.value="";
        e.target.body.value="";
    };


  return (
    <form onSubmit={handleOnSubmit} className="dark-theme-form">
        <input placeholder="Title" name="title" className="dark-theme-input" />
        <input placeholder="Body" name="body" className="dark-theme-input"/>
        <button onSubmit={handleOnSubmit} className='btn btn-primary'>Add</button>
    </form>
  );
}
