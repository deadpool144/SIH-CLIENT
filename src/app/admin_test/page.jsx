import CreateEventForm from "@/components/events/CreateEventForm";

export default function AdminTestPage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6"></h1>
            <CreateEventForm />
        </div>
    );
}