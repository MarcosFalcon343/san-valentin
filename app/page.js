"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Fireworks } from "fireworks-js";
import "./flowers.css";
import "./collage.css";

export default function Home() {
  const [clickedYes, setClickedYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [currentImage, setCurrentImage] = useState(0);
  const [flowers, setFlowers] = useState([]);
  const [hearts, setHearts] = useState([]);
  const fireworksContainer = useRef(null);
  const fireworksInstance = useRef(null);

  // Nuevo estado para el control del audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const images = [
    "/img/img1.jpg",
    "/img/img2.jpg",
    "/img/img3.jpg",
    "/img/img4.jpg",
    "/img/img5.jpg",
    "/img/img6.jpg",
    "/img/img7.jpg",
    "/img/img8.jpg",
    "/img/img9.jpg",
    "/img/img10.jpg",
    "/img/img11.jpg",
    "/img/img12.jpg",
    "/img/img13.jpg",
    "/img/img14.jpg",
    "/img/img15.jpg",
    "/img/img16.jpg",
    "/img/img17.jpg",
    "/img/img18.jpg",
    "/img/img19.jpg",
    "/img/img20.jpg",
  ];

  // Activar fuegos artificiales al hacer clic en "Sí"
  useEffect(() => {
    if (clickedYes && fireworksContainer.current) {
      fireworksInstance.current = new Fireworks(fireworksContainer.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 150,
        trace: 3,
        explosion: 5,
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        delay: { min: 30, max: 60 },
      });

      fireworksInstance.current.start();

      // Detener fuegos artificiales después de 10 segundos
      setTimeout(() => {
        fireworksInstance.current.stop();
      }, 10000);
    }
  }, [clickedYes]);
  // Cambia la imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Genera flores animadas aleatorias
  useEffect(() => {
    const interval = setInterval(() => {
      const newFlower = {
        id: Date.now(),
        left: `${Math.random() * 100}%`, // Posición aleatoria en X
        delay: `${Math.random() * 5}s`, // Retraso aleatorio
      };
      setFlowers((prev) => [...prev, newFlower]);
    }, Math.random() * (1500 - 500) + 500); // Intervalo aleatorio

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (clickedYes) {
      const interval = setInterval(() => {
        const newHeart = {

          id: Date.now(),
          left: `${Math.random() * 90}%`,
          size: `${Math.random() * 30 + 10}px`,
          delay: Math.random() * 2,
        };
        setHearts((prev) => [...prev, newHeart]);

        // Eliminar el corazón después de 4 segundos
        setTimeout(() => {
          setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
        }, 4000);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [clickedYes]);

  // Función para controlar la reproducción y pausa del audio
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 text-center p-6 relative">
      {/* Carrusel */}
      <div className="relative w-[320px] h-[320px] overflow-hidden rounded-lg shadow-lg">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <button
          onClick={() =>
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
          }
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          ⬅️
        </button>
        <button
          onClick={() =>
            setCurrentImage((prev) => (prev + 1) % images.length)
          }
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          ➡️
        </button>
      </div>

      <h1 className="text-4xl font-bold text-red-500 mt-6">Te extraño ❤️</h1>

      {clickedYes ? (
        <p className="text-2xl text-green-600 font-bold">¡Sabía que dirías que sí! 🎉💖</p>
      ) : (
        <div className="flex space-x-4 mt-4 relative">
          <button
            onClick={() => setClickedYes(true)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-red-600 transition"
          >
            Sí 💘
          </button>
          <motion.button
            onClick={() =>
              setNoPosition({ x: Math.random() * 400 - 200, y: Math.random() * 200 - 100 })
            }
            animate={{ x: noPosition.x + 20, y: noPosition.y }} // Mueve 20px a la derecha
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg cursor-pointer"
          >
            No 😢
          </motion.button>
        </div>
      )}

      {/* Animación de flores */}
      <div className="flowers-container">
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            className={`flower flower${(flower.id % 6) + 1}`}
            initial={{ bottom: '-10%' }}
            animate={{ bottom: '100vh', bottom: '-2%' }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: flower.delay,
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ left: flower.left }}
          />
        ))}
      </div>

      {/* Animación de corazones */}
      {clickedYes && (
        <div className="hearts-container absolute top-0 left-0 w-full h-full pointer-events-none">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-red-500"
              initial={{ bottom: "-10%", opacity: 0 }}
              animate={{ bottom: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 4,
                ease: "easeOut",
                delay: heart.delay,
              }}
              style={{
                left: heart.left,
                fontSize: heart.size,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}

      <div
        ref={fireworksContainer}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      ></div>
      {/* Botón de audio */}
      <button
        onClick={toggleAudio}
        className={`fixed bottom-4 right-4 p-4 rounded-full ${isPlaying ? "bg-red-700" : "bg-red-500"}`}
      >
        {isPlaying ? "Pausar 🎵" : "Reproducir 🎶"}
      </button>


      {/* Elemento de audio */}
      <audio ref={audioRef} src="/fondo.mp3" />
    </div>
  );
}
