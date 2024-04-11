import './App.css';
import {getDynamoProducts, insertProduct, editProduct, deleteProduct, getDynamoProduct} from './Services'
import React, {useEffect, useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function App() {

  const [loader, setLodaer] = useState(true)
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productSelected, setProductSelected] = useState(null)
  const [mode, setMode] = useState(null)
  const [formData, setFormData] = useState({
    sku: '',
    fecha_creacion: '',
    descripcion: '',
    img: '',
    nombre: '',
    precio: '',
  })

  useEffect(() => {
    getProducts()
  }, [])
  
  let getProducts = () => {
    getDynamoProducts().then((res) => {
      console.log("🚀 ~ getProducts ~ res:", res)
      setProducts(res['body']['Items'])
    }).finally(() => setLodaer(false))
  }

  const handleSubmit = (event, mode) => {
    event.preventDefault();
    console.log(formData)
    if(mode === 'add'){
      formData.fecha_creacion = moment().format("YYYYMMDD")
      insertProduct(formData).then((res) => {
        console.log("🚀 ~ insertProduct ~ res:", res)
        handleClose()
        getProducts()
      })
    }
    else{
      editProduct(formData).then((res) => {
        console.log("🚀 ~ editProduct ~ res:", res)
        handleClose()
        getProducts()
      })
    }
  }

  const handleInputChange = (event) => {
    const name = event.target.name
    let value = event.target.value

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const selectProduct = (product) => {
    setProductSelected(product)
    let productTemp = {
      sku: product.sku,
      fecha_creacion: product.fecha_creacion,
      descripcion: product.descripcion,
      img: product.img,
      nombre: product.nombre,
      precio: product.precio,
    }
    setFormData(productTemp)
    setMode('edit')
    handleOpen()
  }

  const openModalAddProduct = () => {
    setMode('add')
    handleOpen()
  }

  const handleDelete = (product) => {
    setLodaer(true)
    deleteProduct(product).then((res) => {
      console.log("🚀 ~ deleteProduct ~ res:", res)
      handleClose()
      getProducts()
      setLodaer(false)
    })
  }

  const handleVer = (product) => {
    setLodaer(true)
    setMode('ver')
    getDynamoProduct(product).then((res) => {
      console.log("🚀 ~ getDynamoProduct ~ product:", res)
      setFormData(res['body']['Item'])
      setLodaer(false)
      handleOpen()
    })
  }
  
  return (
    <div className="App">
      <section>
        <h1 style={{marginBottom:'20px'}}>Products Control Antonio Amador IECA AWS</h1>
        {
          loader ? (<span>Cargando...<CircularProgress /></span>):
          (
            <>
            <Button variant="outlined" style={{marginBottom:'20px'}} onClick={openModalAddProduct}>
              <AddIcon fontSize='large'></AddIcon>
            </Button>
            <Grid container spacing={2}>
              {
                products.map((product) => {
                  return(
                    <Grid xs={4} key={product.sku}>
                      <Card variant="outlined">
                        <CardMedia
                          sx={{ height: 140 }}
                          image={product.img}
                          title="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.descripcion}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ${product.precio}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            SKU: {product.sku}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" onClick={() => handleVer(product)}>Ver</Button>
                          <Button size="small" onClick={() => selectProduct(product)}>Editar</Button>
                          <Button size="small" onClick={() => handleDelete(product)}>Eliminar</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <TextField fullWidth label="SKU" variant="standard" name='sku' onChange={handleInputChange} value={formData.sku} />
                    </Grid>
                    <Grid xs={6}>
                      <TextField fullWidth label="Nombre" variant="standard" name='nombre' onChange={handleInputChange} value={formData.nombre}/>
                    </Grid>
                    <Grid xs={6}>
                      <TextField fullWidth label="Descripción" variant="standard" name='descripcion' onChange={handleInputChange} value={formData.descripcion}/>
                    </Grid>
                    <Grid xs={6}>
                      <TextField fullWidth label="Precio" variant="standard" name='precio' onChange={handleInputChange} value={formData.precio}/>
                    </Grid>
                    <Grid xs={6}>
                      <TextField fullWidth label="URL de imágen" variant="standard" name='img' onChange={handleInputChange} value={formData.img}/>
                    </Grid>
                    <Grid xs={4}>
                      {
                        mode != 'ver' && <Button type='submit' size="small">{mode === 'add' ? 'Guardar':'Actualizar'}</Button>                
                      }
                    </Grid>
                  </Grid>
                </form>
              </Box>              
            </Modal>
          </>
          )
        }
      </section>
    </div>
  );
}

export default App;
