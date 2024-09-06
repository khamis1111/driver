import { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { CreditCard, DollarSign, Clock } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { PostData } from '../../api/Axios/usePostData'
import notify from '../../utils/useToastify'
import { HmacSHA512 } from 'crypto-js'
import DestinationPicker from '../../components/Distination'

export default function AddCustomers() {
    const [patientName, setPatientName] = useState('')
    const [destination, setDestination] = useState('')
    const [price, setPrice] = useState()
    const [isPaid, setIsPaid] = useState(false)
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState('')

    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)
    const [showArrivalTime, setShowArrivalTime] = useState(false)

    const handleAddCustomer = (e) => {
        e.preventDefault()

        PostData('/api/v1/patients', {
            patientName,
            direction: from,
            price,
            phone,
            email
        }).then((res) => {
            notify('Added Successfully', 'success')

            PostData(`/api/v1/patients/checkout/${res.data.data._id}`, {
                redirection_url: process.env.REACT_APP_BASE_URL
            }).then((res) => {
                window.open(res.data.payUrl, '_self');
            }).catch((err) => {
                notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
            })

        }).catch((err) => {
            notify(err.response.data.msg || err.response.data.message || err.response.data.errors[0].msg, 'error')
        })
    }

    const webhookPaymob = () => {
        try {
            const parsedUrl = new URL(window.location.href)
            const params = parsedUrl.searchParams

            const relevantParams = {
                amount_cents: params.get('amount_cents'),
                created_at: params.get('created_at'),
                currency: params.get('currency'),
                error_occured: params.get('error_occured'),
                has_parent_transaction: params.get('has_parent_transaction'),
                id: params.get('id'),
                integration_id: params.get('integration_id'),
                is_3d_secure: params.get('is_3d_secure'),
                is_auth: params.get('is_auth'),
                is_capture: params.get('is_capture'),
                is_refunded: params.get('is_refunded'),
                is_standalone_payment: params.get('is_standalone_payment'),
                is_voided: params.get('is_voided'),
                order: params.get('order'),
                owner: params.get('owner'),
                pending: params.get('pending'),
                'source_data.pan': params.get('source_data.pan'),
                'source_data.sub_type': params.get('source_data.sub_type'),
                'source_data.type': params.get('source_data.type'),
                success: params.get('success')
            }

            const newConcatString = [
                relevantParams.amount_cents,
                relevantParams.created_at,
                relevantParams.currency,
                relevantParams.error_occured,
                relevantParams.has_parent_transaction,
                relevantParams.id,
                relevantParams.integration_id,
                relevantParams.is_3d_secure,
                relevantParams.is_auth,
                relevantParams.is_capture,
                relevantParams.is_refunded,
                relevantParams.is_standalone_payment,
                relevantParams.is_voided,
                relevantParams.order,
                relevantParams.owner,
                relevantParams.pending,
                relevantParams['source_data.pan'],
                relevantParams['source_data.sub_type'],
                relevantParams['source_data.type'],
                relevantParams.success
            ].join('')

            const hmac = HmacSHA512(newConcatString, '6D3DDDBE4B65AC0A597CCAD1C2DC2A38').toString()

            setIsPaid(hmac === params.get('hmac'))
        } catch (error) {
            console.error('Error parsing URL:', error)
        }
    }

    useEffect(() => {
        webhookPaymob()
        if (isPaid === true) {
            setShowPaymentConfirmation(true)
            setShowArrivalTime(false)
            setTimeout(() => {
                setShowPaymentConfirmation(false)
                setShowArrivalTime(true)
            }, 3000);
        }
    }, [isPaid])
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Book Your Ride</CardTitle>
                <CardDescription>Enter your details and destination to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAddCustomer}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="patientName">Customer Name</label>
                            <Input
                                id="patientName"
                                placeholder="Enter your name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone">Phone</label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    placeholder="Enter your phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    type='number'
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="price">Price</label>
                            <div className="relative">
                                <Input
                                    id="price"
                                    placeholder="Enter your price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    type='number'
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="Destination">Destination</label>
                            <div className="d-flex align-items-center gap-2">
                                <DestinationPicker
                                    arrayOfData={[{ name: 'Khamis' }]}
                                    setData={setFrom}
                                    data={from}
                                    placeholder={'From'}
                                />
                                <DestinationPicker
                                    arrayOfData={[{ name: 'Ahmed' }]}
                                    setData={setTo}
                                    data={to}
                                    placeholder={'To'}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label>Payment Method</label>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cash" id="cash" />
                                    <label htmlFor="cash" className="flex items-center">
                                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                                        Cash on Delivery
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="credit" id="credit" />
                                    <label htmlFor="credit" className="flex items-center">
                                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                                        Credit Card
                                    </label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-4">Book Ride</Button>
                </form>
            </CardContent>
            {
                isPaid &&
                (
                    <CardFooter className="flex flex-col items-center">
                        {showPaymentConfirmation && (
                            <p className="text-green-500 font-semibold">Payment successful! Booking your ride...</p>
                        )}
                        {showArrivalTime && (
                            <div className="flex items-center text-primary">
                                <Clock className="mr-2 h-5 w-5" />
                                <p>Your driver will arrive in approximately 10 minutes.</p>
                            </div>
                        )}

                    </CardFooter>
                )
            }
        </Card>
    )
}