import { createClient } from "@/lib/supabase/server";

interface Props {
    params: {
        id: string;
    };
}

export default async function DashboardItemPage({ params }: Props) {
    const supabase = createClient();

    // Fetch single row by id
    const { data, error } = await (await supabase)
        .from("items") // Replace with your table name
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {
        return <div className="text-red-500">Error fetching item: {error.message}</div>;
    }

    if (!data) {
        return <div>Item not found</div>;
    }

    return (
        <div className="p-4 border rounded-md shadow-sm">
            <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
            <p>{data.description}</p>
        </div>
    );
}