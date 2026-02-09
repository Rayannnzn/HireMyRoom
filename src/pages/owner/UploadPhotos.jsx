import { useState, useEffect, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../../components/common/Button';

// Mock properties
const mockProperties = [
  { id: '1', name: 'Cozy Studio Apartment' },
  { id: '2', name: 'Luxury Hostel Room' },
  { id: '3', name: 'Budget Room' },
];

function UploadPhotos() {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [images, setImages] = useState([]);
  const imagesRef = useRef(images);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
  };

  const handleRemoveImage = (id) => {
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove && imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
  };

  // Update ref when images change
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProperty) {
      alert('Please select a property');
      return;
    }
    if (images.length === 0) {
      alert('Please upload at least one image');
      return;
    }
    // Mock submit
    console.log('Uploading photos for property:', selectedProperty, images);
    alert('Photos uploaded successfully! (Mock)');
    setImages([]);
    setSelectedProperty('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Upload Property Photos</h1>
        <p className="text-slate-600">Add photos to showcase your property.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-6">
          {/* Property Selection */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Select Property *</label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">Choose a property</option>
              {mockProperties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Upload Images *</label>
            <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-2"
              >
                <div className="rounded-full bg-indigo-100 p-3">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-semibold text-slate-700">
                Preview ({images.length} {images.length === 1 ? 'image' : 'images'})
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image) => (
                  <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Upload Photos
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setImages([]);
                setSelectedProperty('');
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadPhotos;
