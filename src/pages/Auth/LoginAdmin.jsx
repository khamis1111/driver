import { useState } from "react"
import { Eye, EyeOff, Globe } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { PostData } from "../../api/Axios/usePostData"
import notify from "../../utils/useToastify"

export default function LoginAdmin() {
    const [showPassword, setShowPassword] = useState(false)
    const [isEnglish, setIsEnglish] = useState(false)

    const toggleLanguage = () => setIsEnglish(!isEnglish)

    const text = {
        title: isEnglish ? "Admin Login" : "تسجيل دخول المشرف",
        description: isEnglish ? "Enter your credentials to access the admin panel" : "أدخل بيانات الاعتماد للوصول إلى لوحة التحكم",
        email: isEnglish ? "Email" : "البريد الإلكتروني",
        password: isEnglish ? "Password" : "كلمة المرور",
        login: isEnglish ? "Log In" : "تسجيل الدخول",
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handelLogin = (e) => {
        e.preventDefault()
        setLoading(true)

        PostData('/api/v1/auth/login', {
            email,
            password
        }).then(res => {
            setLoading(false)
            if (res.data.data.role === 'admin') {
                notify('تم تسجيل الدخول بنجاح', 'success')
                localStorage.setItem('user', JSON.stringify(res.data.data))
                localStorage.setItem('token', res.data.token)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000);
            } else {
                notify('بتحاول تخترق الموقع دا عند امك', 'error')
            }
        }).catch(err => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
            localStorage.removeItem('token')
            setLoading(false)
        });
    }

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${isEnglish ? 'ltr' : 'rtl'}`}>
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 left-2"
                        onClick={toggleLanguage}
                    >
                        <Globe className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center">{text.title}</CardTitle>
                    <CardDescription className="text-center text-gray-500">{text.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className={`space-y-4`} style={{ direction: isEnglish ? 'ltr' : "rtl" }}>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type="email"
                                    placeholder={text.email}
                                    className="bg-blue-50 border-0 placeholder-gray-400"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder={text.password}
                                    className="pl-20 pr-10 bg-blue-50 border-0 placeholder-gray-400"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={`absolute ${isEnglish ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400`}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={loading} onClick={(e) => handelLogin(e)}
                        >
                            {
                                loading ? 'جاري التحقق...' : text.login
                            }
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}