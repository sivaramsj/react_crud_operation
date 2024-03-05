import React, { useState } from 'react'

export default function Posts({id,title,body,onEdit,ondelete}) {
    const[isEdit,setIsEdit]=useState(false);

    const handleOnEditSubmit=async(e)=>{
        e.preventDefault();
        // console.log(e.target);
        onEdit(id,e.target.title.value,e.target.body.value);
        setIsEdit(!isEdit);
    }

    return (
        // <h1>props</h1>
        <>
        {isEdit?(
            // <form onSubmit={handleOnEditSubmit}>
            //     <input placeholder="Title" name="title" />
            //     <input placeholder="Body" name="body" />
            //     <button onSubmit={handleOnEditSubmit}>Save</button>
            //     <hr />
            //  </form>
            <tr>
                <td colSpan="5">
                    <form onSubmit={handleOnEditSubmit} className='dark-theme-form'>
                        <input placeholder="Title" name="title" className="dark-theme-input" />
                        <input placeholder="Body" name="body" className="dark-theme-input"/>
                        <div className='button-container'>
                        <button type='submit' className="dark-theme-button save-button">Save</button>
                        <button type="button" onClick={() => setIsEdit(false)} className="dark-theme-button cancel-button">Cancel</button>
                        </div>
                    </form>
                </td>
            </tr>
        ):(
            <tr>
                <th scope="row">{id}</th>
                <td>{title}</td>
                <td>{body}</td>
                <td><button onClick={()=>setIsEdit(!isEdit)} className='btn btn-outline-success'>Edit</button></td>
                <td><button onClick={()=>{ondelete(id)}} className='btn btn-outline-danger'>Delete</button></td>
            </tr>  
        )}
        </>
    )
}
