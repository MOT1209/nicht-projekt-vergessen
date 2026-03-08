'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  Search, 
  FolderKanban, 
  CheckCircle2, 
  FileText, 
  Paperclip,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const { projects, tasks, notes, files } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    projects: typeof projects;
    tasks: typeof tasks;
    notes: typeof notes;
  }>({ projects: [], tasks: [], notes: [] });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim().length < 2) {
      setResults({ projects: [], tasks: [], notes: [] });
      return;
    }

    const q = searchQuery.toLowerCase();
    
    setResults({
      projects: projects.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      ),
      tasks: tasks.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      ),
      notes: notes.filter(n => 
        n.content.toLowerCase().includes(q)
      ),
    });
  };

  const totalResults = results.projects.length + results.tasks.length + results.notes.length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">البحث</h1>
        <p className="text-gray-500 mt-1">ابحث في جميع مشاريعك ومهامك وملاحظاتك</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="اكتب للبحث..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pr-10 h-12 text-lg"
        />
      </div>

      {/* Results */}
      {query.trim().length >= 2 ? (
        <div className="space-y-6">
          {totalResults > 0 ? (
            <>
              {/* Projects */}
              {results.projects.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FolderKanban className="h-5 w-5 text-violet-500" />
                    المشاريع ({results.projects.length})
                  </h2>
                  <div className="space-y-2">
                    {results.projects.map((project) => (
                      <Link key={project.id} href={`/projects/${project.id}`}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-4 flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            <div className="flex-1">
                              <p className="font-medium">{project.name}</p>
                              <p className="text-sm text-gray-500">{project.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tasks */}
              {results.tasks.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    المهام ({results.tasks.length})
                  </h2>
                  <div className="space-y-2">
                    {results.tasks.map((task) => {
                      const project = projects.find(p => p.id === task.projectId);
                      return (
                        <Link key={task.id} href={`/projects/${task.projectId}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-3">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                task.status === 'DONE' ? 'bg-green-500' :
                                task.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-gray-400'
                              )} />
                              <div className="flex-1">
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-gray-500">{project?.name}</p>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes */}
              {results.notes.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    الملاحظات ({results.notes.length})
                  </h2>
                  <div className="space-y-2">
                    {results.notes.map((note) => {
                      const project = projects.find(p => p.id === note.projectId);
                      return (
                        <Link key={note.id} href={`/projects/${note.projectId}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <p className="text-sm text-gray-500 mb-2">{project?.name}</p>
                              <p className="line-clamp-2">{note.content}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد نتائج لـ "{query}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">ابدأ بالبحث في مشاريعك ومهامك وملاحظاتك</p>
        </div>
      )}
    </div>
  );
}
