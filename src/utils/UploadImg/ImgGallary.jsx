import { MoveIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent } from "../../components/ui/dialog"

export default function ImgGallary({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imageRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && imageRef.current) {
        const dx = e.clientX - dragStart.x
        const dy = e.clientY - dragStart.y
        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }))
        setDragStart({ x: e.clientX, y: e.clientY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsFullScreen(true)
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 5))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <div className="p-0 pt-3">
          {
            Array.isArray(images) ?
              (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-center">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      onClick={() => handleImageClick(image)}
                    >
                      <img src={image} alt={`Img ${index + 1}`} className="object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              )
              :
              <div className="grid grid-cols-1 text-center">
                <div
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                  onClick={() => handleImageClick(images)}
                >
                  <img src={images} alt={images} className="object-cover rounded-lg" />
                </div>
              </div>
          }
        </div>
      </div>

      <Dialog open={isFullScreen} onOpenChange={setIsFullScreen}>
        <DialogContent className="max-w-full h-full p-0 bg-background/70 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              ref={imageRef}
              src={selectedImage || ''}
              alt="Full screen view"
              className="max-w-none"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
              onMouseDown={handleMouseDown}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              <button onClick={handleZoomIn} className="p-2 bg-background/80 rounded-full hover:bg-background">
                <ZoomInIcon className="h-6 w-6" />
              </button>
              <button onClick={handleZoomOut} className="p-2 bg-background/80 rounded-full hover:bg-background">
                <ZoomOutIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="absolute top-4 left-4 text-sm text-muted-foreground fw-bold">
              <MoveIcon className="inline-block mr-1 h-4 w-4" /> انقر واسحب للتحرك
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
