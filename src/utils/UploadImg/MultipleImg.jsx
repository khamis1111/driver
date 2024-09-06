import { useState, useRef } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ImageIcon, UploadIcon, XIcon } from 'lucide-react'

export default function MultipleImg({ images, setImages }) {
    // const [images, setImages] = useState([])
    const fileInputRef = useRef(null)

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files || [])
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setImages(prevImages => [...prevImages, ...newImages])
    }

    const handleDragOver = (event) => {
        event.preventDefault()
        event.currentTarget.classList.add('bg-primary/10')
    }

    const handleDragLeave = (event) => {
        event.currentTarget.classList.remove('bg-primary/10')
    }

    const handleDrop = (event) => {
        event.preventDefault()
        event.currentTarget.classList.remove('bg-primary/10')
        const files = Array.from(event.dataTransfer.files)
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }))
        setImages(prevImages => [...prevImages, ...newImages])
    }

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div
                        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors duration-300 ease-in-out"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <UploadIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                            اسحب وأفلِت الصور هنا، أو انقر لتحديدها
                        </p>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    {images.length > 0 && (
                        <div className="text-sm text-muted-foreground mb-2">
                            {images.length} {images.length !== 1 ? 'الصور' : 'الصورة'} المختارة
                        </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image.preview ? image.preview : image}
                                    alt={`Preview ${index}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-background/80 p-1 rounded-full opacity-1 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <XIcon className="h-4 w-4 text-foreground" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                    >
                        <ImageIcon className="ml-2 h-4 w-4" />
                        أضف المزيد من الصور
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
