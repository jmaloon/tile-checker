import { useRef } from "react";
import "./reset.css";
import "./App.css";

function App() {
  const initialBackgroundSize =
    document.body.style.getPropertyValue("background-size");

  const uploadInputRef = useRef<HTMLInputElement>(null);

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    readAsDataURL(file);
  }

  async function handlePaste() {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        const imageType = clipboardItem.types.find((type) =>
          type.startsWith("image/")
        );

        if (!imageType) return;
        const blob = await clipboardItem.getType(imageType);
        readAsDataURL(blob);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleSizeChange(event: React.ChangeEvent<HTMLInputElement>) {
    document.body.style.setProperty(
      "background-size",
      `${event.target.value}px`
    );
  }

  function readAsDataURL(fileOrBlob: File | Blob | undefined) {
    if (!fileOrBlob) return;

    var reader = new FileReader();

    reader.onload = function (event) {
      const result = event.target?.result;
      if (!result) return;

      document.body.style.setProperty("background-image", `url(${result})`);
    };

    reader.readAsDataURL(fileOrBlob);
  }

  return (
    <>
      <main className="main">
        <h1>Tile Checker</h1>
        <p>Upload an image to quickly test the tile-ness of your image</p>
        <button onClick={() => uploadInputRef.current?.click()}>
          Select a photo
        </button>
        <button onClick={handlePaste}>Copy from clipboard</button>
        <input
          defaultValue={initialBackgroundSize}
          type="range"
          id="image_size_slider"
          name="image_size_slider"
          min="10"
          max="1000"
          step="10"
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
