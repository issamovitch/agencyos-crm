'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { Menu, SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const FulltextSearch = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { toggle: toggleSidebar } = useSidebarStore();

  const handleSearch = async () => {
    if (!search) return;
    router.push(`/fulltext-search?q=${search}`);
    setSearch('');
  };

  return (
    <div className="flex w-full items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="flex-shrink-0"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={'Search something ...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pr-10"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FulltextSearch;
