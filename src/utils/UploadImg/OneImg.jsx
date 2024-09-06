import { useRef } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ImageIcon, UploadIcon, XIcon } from 'lucide-react'

export default function OneImg({ image, setImage }) {
    // const [image, setImage] = useState(null)
    const fileInputRef = useRef(null)

    const handleImageChange = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setImage({
                file,
                preview: URL.createObjectURL(file)
            })
        }
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
        const file = event.dataTransfer.files[0]
        if (file) {
            setImage({
                file,
                preview: URL.createObjectURL(file)
            })
        }
    }

    const removeImage = () => {
        setImage(null)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-6">
                <div className="space-y-4">
                    {!image ? (
                        <div
                            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ease-in-out"
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <UploadIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-sm text-muted-foreground">
                                اسحب وأفليت الصورة هنا، أو انقر لتحديدها
                            </p>
                        </div>
                    ) : (
                        <div className="relative group">
                            <img
                                src={image.preview ? image.preview : image}
                                alt="Selected preview"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-background/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <XIcon className="h-5 w-5 text-foreground" />
                            </button>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full"
                    >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        {image ? 'تغيير الصورة' : 'اختر الصورة'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
