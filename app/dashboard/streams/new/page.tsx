import Navigation from '@/components/Navigation';
import CreateStreamForm from '@/components/CreateStreamForm';

export default function NewStreamPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 gradient-text">Create New Stream</h1>
          <div className="card p-8">
            <CreateStreamForm />
          </div>
        </div>
      </div>
    </div>
  );
}