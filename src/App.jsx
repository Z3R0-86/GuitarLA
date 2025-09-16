import { useState } from 'react'
import './App.css'
import Header from './Componentes/Header'
import Guitar from './Guitar'
import { db } from './data/db'

function App() {
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  // Agregar guitarra al carrito
  function addToCart(product) {
    const itemExists = cart.find(item => item.id === product.id)

    if (itemExists) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Eliminar guitarra del carrito
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  // Actualizar cantidad (+ o -)
  function updateQuantity(id, delta) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    )
  }

  // Vaciar carrito
  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map(guitar => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  )
}
export default App