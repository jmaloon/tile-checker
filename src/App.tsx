import { useRef } from "react";
import "./reset.css";
import "./App.css";

function App() {
  const initialBackgroundSize =
    document.body.style.getPropertyValue("background-size");

  const uploadInputRef = useRef<HTMLInputElement>(null);

  function handleUploadButton() {
    uploadInputRef.current?.click();
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    readFileOrBlob(file);
  }

  async function handlePaste() {
    try {
      const clipboardItems = await navigator.clipboard.read();

      const clipboardItemWithImageType = clipboardItems.find((item) =>
        item.types.some((type) => type.startsWith("image/"))
      );
      if (!clipboardItemWithImageType) return;

      const imageType = clipboardItemWithImageType.types.find((type) =>
        type.startsWith("image/")
      );
      if (!imageType) return;

      const blob = await clipboardItemWithImageType.getType(imageType);
      readFileOrBlob(blob);
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

  function readFileOrBlob(fileOrBlob: File | Blob | undefined) {
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
    <main className="main">
      <h1>Tile Checker</h1>
      <p>Tool for checking the ability to tile your image</p>
      <div className="main-actions">
        <button onClick={handleUploadButton}>Upload</button>
        <button onClick={handlePaste}>Paste</button>
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
      </div>

      <input
        ref={uploadInputRef}
        type="file"
        id="upload_input"
        name="upload_input"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      />
    </main>
  );
}

export default App;
