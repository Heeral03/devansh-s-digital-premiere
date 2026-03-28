import React, { useState } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    "1000065356.JPG", "1000065357.JPG", "1000065364.JPG", "1000088571.JPG", 
    "1000088574.JPG", "1000088577.JPG", "1000096028.JPG", "1000096029.JPG", 
    "1000096032.JPG", "1000108495.JPG", "1000108496.JPG", "1000108500.JPG", 
    "1000108502.JPG", "1000113353.JPG", "1000113429.JPG", "696f723a-e2bc-4342-a49d-574fe11700fb.jpg",
    "Copy of DSC03240.JPEG", "Copy of DSC09648.JPEG", "Copy of DSC09861.JPEG", "Copy of DSC_0371.JPEG", 
    "Copy of DSC_0886.JPEG", "Copy of DSC_0897.JPEG", "Copy of DSC_0898.JPEG", "Copy of DSC_0948.JPEG", 
    "Copy of DSC_0953.JPEG", "IMG_4937.JPEG", "IMG_4944.JPEG", "IMG_4956.JPEG", 
    "IMG_5156.JPEG", "IMG_5168.JPEG", "IMG_5218.jpg", "IMG_6385.jpg"
  ];

  return (
    <section id="gallery" className="section bg-secondary">
      <div className="container">
        
        <div className="section-header fade-up">
          <h2 className="section-title">THE ARCHIVE</h2>
          <p className="section-subtitle">
            A comprehensive exhibition of instances, raw emotions, and pure reactions.
          </p>
        </div>

        <div className="gallery-masonry">
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="gallery-frame fade-up"
              onClick={() => setSelectedImage(src)}
            >
              <div className="frame-inner">
                <img src={`/devansh/Act_Pictures/${src}`} alt={`Act moment ${idx + 1}`} loading="lazy" />
                <div className="frame-overlay">
                  <span>View</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {selectedImage && (
        <div className="lightbox-cinematic" onClick={() => setSelectedImage(null)}>
          <button className="lightbox-close">CLOSE [X]</button>
          <img src={`/devansh/Act_Pictures/${selectedImage}`} alt="Enlarged act" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default Gallery;
