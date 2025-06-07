import React, { useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const Sticker = ({ imageUrl, x, y, onDoubleClick }) => {
  const [img] = useImage(imageUrl);
  return (
    <KonvaImage
      image={img}
      x={x}
      y={y}
      width={40}
      height={40}
      draggable
      onDblClick={onDoubleClick}
    />
  );
};

const App = () => {
  const stageRef = useRef();
  const [stickers, setStickers] = useState([]);
  const stickerOptions = ['/sticker1.png', '/sticker2.png', '/sticker3.png'];

  const addSticker = (url) => {
    setStickers([...stickers, {
      id: Date.now(),
      url,
      x: 100,
      y: 100,
    }]);
  };

  const deleteSticker = (id) => {
    setStickers(stickers.filter(s => s.id !== id));
  };

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = uri;
    link.click();
  };

  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      <div>
        {stickerOptions.map((url, i) => (
          <img
            key={i}
            src={url}
            alt="sticker"
            width={40}
            height={40}
            onClick={() => addSticker(url)}
            style={{ cursor: 'pointer', marginBottom: 10 }}
          />
        ))}
        <button onClick={downloadImage} style={{ marginTop: 20 }}>
          Download Canvas
        </button>
      </div>
      <Stage width={600} height={400} ref={stageRef} style={{ border: '1px solid #ccc' }}>
        <Layer>
          {stickers.map(sticker => (
            <Sticker
              key={sticker.id}
              imageUrl={sticker.url}
              x={sticker.x}
              y={sticker.y}
              onDoubleClick={() => deleteSticker(sticker.id)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
