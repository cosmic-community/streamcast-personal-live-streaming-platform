'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';
import type { CreateStreamForm, StreamVisibility } from '@/types';

export default function CreateStreamForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateStreamForm>({
    title: '',
    description: '',
    category: '',
    visibility: 'public',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/streams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create stream');
      }

      // Redirect to the stream page
      router.push(`/stream/${result.data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Stream Title *
        </label>
        <input
          type="text"
          id="title"
          required
          className="input w-full"
          placeholder="Enter your stream title..."
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="textarea w-full"
          placeholder="Describe your stream..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            className="select w-full"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select a category</option>
            <option value="gaming">Gaming</option>
            <option value="education">Education</option>
            <option value="music">Music</option>
            <option value="tech">Technology</option>
            <option value="art">Art & Design</option>
            <option value="sports">Sports</option>
            <option value="cooking">Cooking</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="visibility" className="block text-sm font-medium mb-2">
            Visibility
          </label>
          <select
            id="visibility"
            className="select w-full"
            value={formData.visibility}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              visibility: e.target.value as StreamVisibility 
            }))}
          >
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          className="input w-full"
          placeholder="Add tags and press Enter..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagAdd}
        />
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-white hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !formData.title.trim()}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="loading-spinner" />
            Creating Stream...
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Create Stream
          </>
        )}
      </button>
    </form>
  );
}