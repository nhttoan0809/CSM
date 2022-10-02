import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <Button>
        <Link to='warehouse'>Kho</Link>
      </Button>
      <Button>
        <Link to='pallet'>Pallet</Link>
      </Button>
      <Button>
        <Link to='goods'>Hàng hóa</Link>
      </Button>
      <Button>
        <Link to='sensor'>Cảm biến</Link>
      </Button>
      <Button>
        <Link to='company'>Công ty</Link>
      </Button>
      <Button>
        <Link to='agent'>Đại lý</Link>
      </Button>
    </>
  )
}

export default Sidebar