import { useState, useEffect} from 'react'

export const FollowMouse = () => {
    const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Pointer move
  useEffect(() => {
    //console.log("effect", { enable });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      //console.log("handleMove", { clientX, clientY });
      setPosition({ x: clientX, y: clientY });
    };

    // Si enable es true se ejecuta la funcion
    if (enable) {
      window.addEventListener("pointermove", handleMove);
    }

    //cleanup
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias, antes de ejecutar el efecto nuevo
    return () => {
      window.removeEventListener("pointermove", handleMove)
    }
  }, [enable]);

  useEffect(() =>{
    document.body.classList.toggle('no-cursor', enable)

    return () =>{
        document.body.classList.remove('no-cursor')
    }
  }, [enable])



  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          border: "1px solid #fff",
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <h3>Mouse Follower</h3>
      <button onClick={() => setEnable(!enable)}>
        {enable ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </main>
  )
}
