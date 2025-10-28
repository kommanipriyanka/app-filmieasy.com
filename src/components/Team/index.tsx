import { useNavigate } from '@tanstack/react-router';
import React from 'react'

function index() {
  const navigate = useNavigate();
  return (
    <div>index team

      <button onClick={() => navigate({to:"/team/add-user"})}>Add User</button>
    </div>
  )
}

export default index