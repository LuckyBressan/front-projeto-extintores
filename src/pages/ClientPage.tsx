import { ClientProvider } from "@/components/client/ClientProvider";
import DataTableClient from "@/components/client/DataTableClient";

export default function ClientPage() {
  return (
    <>
      <ClientProvider>
        {/* <SectionCardsCategory />
        <ChartsCategory /> */}
        <DataTableClient />
      </ClientProvider>
    </>
  );
}
