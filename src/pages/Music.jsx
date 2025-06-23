import { useEffect, useState } from "react";
import MediaControlCard from "../components/RepCard";
import { Grid, Container } from "@mui/material";
import { getMusica } from "../utils/music";
import MusicPlayerBar from "../components/MusicPlayerBar";

export default function Music() {
  const [mus, setMus] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getMusica()
      .then(setMus)
      .catch((error) => {
        console.error("Error cargando música:", error);
      });
  }, []);

  return (
    <>
      <Container sx={{ py: 4, pb: 10 }}>
        <Grid container spacing={3}>
          {mus.map((cancion, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MediaControlCard
                titulo={cancion.titulo}
                artista={cancion.artista}
                duracion={cancion.duracion}
                imagen={cancion.imagen}
                archivo={cancion.archivo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <MusicPlayerBar
        playlist={mus}
        currentIndex={currentIndex}
        onChangeTrack={setCurrentIndex}
      />
    </>
  );
}
