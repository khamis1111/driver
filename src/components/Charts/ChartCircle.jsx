import React from 'react';
import { FaChartPie } from "react-icons/fa6";
import { Label, Pie, PieChart } from "recharts";
import {
    Card,
    CardContent, CardHeader
} from "../../components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "../../components/ui/chart";


const ChartCircle = ({ UsersPaid, UsersNotPaid }) => {
    const chartData = [
        { browser: "المدفوع", visitors: UsersPaid && UsersPaid.length, fill: "var(--color-chrome)" },
        { browser: "المستحق", visitors: UsersNotPaid && UsersNotPaid.length, fill: "var(--color-safari)" },
    ]
    const chartConfig = {
        visitors: {
            label: "المجموع",
        },
        chrome: {
            label: "المدفوع",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "المستحق",
            color: "hsl(var(--chart-2))",
        },
    }

    const totalVisitors = React.useMemo(() => {
        return UsersPaid && UsersPaid.reduce((acc, curr) => acc + curr.price, 0)
    }, [UsersPaid])

    return (
        <Card className="flex flex-col rounded-5 shadow-none border-0">
            <CardHeader className="pb-1">
                <div className="d-flex align-items-center gap-2">
                    <div className='bg-body-secondary shadow d-inline-block text-dark p-2 rounded-4 mb-2'>
                        <FaChartPie size={35} />
                    </div>
                    <div className='lh-sm'>
                        <p className='fs-4 m-0'>مخطط دائري</p>
                        <p className='opacity-75 fs-6'>تقرير الدفع و الدخل الكلي</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    مجموع الدخل
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default ChartCircle
