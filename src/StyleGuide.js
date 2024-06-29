import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyleGuide = () => {
  const [styleSettings, setStyleSettings] = useState({
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    headingFontSize: '32px'
  });

  const [fontOptions, setFontOptions] = useState([]);

  useEffect(() => {
    fetch('/styleSettings.json')
      .then(response => response.json())
      .then(data => setStyleSettings(data));

    fetch('/fonts.json')
      .then(response => response.json())
      .then(data => setFontOptions(data.fonts));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyleSettings(prevSettings => ({ ...prevSettings, [name]: value }));
  };

  const handleIncrement = (field, increment) => {
    setStyleSettings(prevSettings => ({
      ...prevSettings,
      [field]: `${parseInt(prevSettings[field]) + increment}px`
    }));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Style Guide Generator</h1>
      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="primaryColor">Primary Color</label>
              <input 
                type="color" 
                className="form-control" 
                id="primaryColor" 
                name="primaryColor"
                value={styleSettings.primaryColor}
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="secondaryColor">Secondary Color</label>
              <input 
                type="color" 
                className="form-control" 
                id="secondaryColor" 
                name="secondaryColor"
                value={styleSettings.secondaryColor}
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="fontFamily">Font Family</label>
              <select 
                className="form-control" 
                id="fontFamily" 
                name="fontFamily"
                value={styleSettings.fontFamily}
                onChange={handleChange} 
              >
                {fontOptions.map(font => (
                  <option key={font.name} value={font.name} style={{ fontFamily: font.css }}>{font.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fontSize">Font Size</label>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  id="fontSize" 
                  name="fontSize"
                  value={styleSettings.fontSize}
                  onChange={handleChange} 
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncrement('fontSize', -1)}>-</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncrement('fontSize', 1)}>+</button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="headingFontSize">Heading Font Size</label>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  id="headingFontSize" 
                  name="headingFontSize"
                  value={styleSettings.headingFontSize}
                  onChange={handleChange} 
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncrement('headingFontSize', -1)}>-</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncrement('headingFontSize', 1)}>+</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <div className="preview">
            <div className="header" style={{ backgroundColor: styleSettings.primaryColor, color: 'white', padding: '10px', marginBottom: '10px' }}>
              Header
            </div>
            <div className="content-box" style={{ backgroundColor: styleSettings.secondaryColor, padding: '20px', marginBottom: '10px' }}>
              <h1 style={{ fontSize: styleSettings.headingFontSize, fontFamily: styleSettings.fontFamily, color: styleSettings.primaryColor }}>Content Box Heading</h1>
              <p style={{ fontSize: styleSettings.fontSize, fontFamily: styleSettings.fontFamily, color: 'black' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in libero eget justo fermentum malesuada. Proin non maximus purus. Phasellus sed lorem non augue finibus blandit.</p>
            </div>
            <div className="footer" style={{ backgroundColor: styleSettings.primaryColor, color: 'white', padding: '10px' }}>
              Footer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;
