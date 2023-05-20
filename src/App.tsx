import { useRef } from "react";
import "./reset.css";
import "./App.css";

function App() {
  const initialBackgroundSize =
    document.body.style.getPropertyValue("background-size");

  const uploadInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    var reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target?.result;
      if (!result) return;
      document.body.style.setProperty("background-image", `url(${result})`);
    };

    reader.readAsDataURL(file);
  }

  function handleSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    document.body.style.setProperty(
      "background-size",
      `${event.target.value}px`
    );
  }

  return (
    <>
      <main className="main">
        <h1>Tile Checker</h1>
        <p>Upload an image to quickly test the tile-ness of your image</p>
        <button onClick={() => uploadInputRef.current?.click()}>
          Select a photo
        </button>
        <input
          defaultValue={initialBackgroundSize}
          type="range"
          id="image_size_slider"
          name="image_size_slider"
          min="10"
          max="1000"
          onChange={handleSizeChange}
        />
      </main>

      <input
        ref={uploadInputRef}
        type="file"
        id="upload_input"
        name="upload_input"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      />
    </>
  );
}

export default App;
