import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { ChartContainer, type ChartConfig } from "../ui/chart";
import { useCategoryContext } from "./CategoryProvider";

export default function ChartsCategory() {
  const { categorysWithMostProducts } = useCategoryContext();

  const chartData = categorysWithMostProducts.map((category) => {
    return {
      category: category.nome,
      products: category.totalProdutos,
    };
  });

  console.log(chartData);

  const chartConfig = {
    products: {
      label: "Total de Produtos",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[100px] h-50 w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="products" fill="var(--color-products)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="text-zinc-800"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
