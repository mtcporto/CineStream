'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StreamCard } from '@/components/stream-card';
import { mockStreams, genres as allGenres, languages as allLanguages, qualities as allQualities } from '@/lib/data';
import type { Stream } from '@/lib/types';
import { Search, SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [sortBy, setSortBy] = useState('title_asc');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Avoid hydration mismatch by ensuring client-side only rendering for initial random sort or dynamic content
  }, []);

  const filteredAndSortedStreams = useMemo(() => {
    let streams: Stream[] = [...mockStreams];

    if (searchTerm) {
      streams = streams.filter(stream =>
        stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stream.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      streams = streams.filter(stream => stream.genre === selectedGenre);
    }
    if (selectedLanguage !== 'all') {
      streams = streams.filter(stream => stream.language === selectedLanguage);
    }
    if (selectedQuality !== 'all') {
      streams = streams.filter(stream => stream.quality === selectedQuality);
    }

    streams.sort((a, b) => {
      switch (sortBy) {
        case 'title_asc':
          return a.title.localeCompare(b.title);
        case 'title_desc':
          return b.title.localeCompare(a.title);
        case 'genre_asc':
          return a.genre.localeCompare(b.genre) || a.title.localeCompare(b.title);
        case 'genre_desc':
          return b.genre.localeCompare(a.genre) || a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return streams;
  }, [searchTerm, selectedGenre, selectedLanguage, selectedQuality, sortBy]);

  if (!mounted) {
    // Optional: render a loading state or null to prevent hydration errors from dynamic filtering/sorting on first render
    return (
      <div className="space-y-6">
        <div className="animate-pulse rounded-md bg-muted h-10 w-full"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg bg-muted h-72"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-center sm:text-4xl">
        Discover Your Next Favorite Stream
      </h1>

      <div className="mb-8 space-y-4 rounded-lg border bg-card p-4 shadow-sm md:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search streams by title or keyword..."
            className="w-full rounded-md bg-background py-3 pl-10 text-base focus:ring-accent"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search streams"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="genre-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Genre
            </Label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-filter" className="w-full" aria-label="Filter by genre">
                <SelectValue placeholder="Filter by Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
               <SlidersHorizontal className="mr-2 h-4 w-4" /> Language
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger id="language-filter" className="w-full" aria-label="Filter by language">
                <SelectValue placeholder="Filter by Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {allLanguages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quality-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
               <SlidersHorizontal className="mr-2 h-4 w-4" /> Quality
            </Label>
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger id="quality-filter" className="w-full" aria-label="Filter by quality">
                <SelectValue placeholder="Filter by Quality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Qualities</SelectItem>
                {allQualities.map(qual => (
                  <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sort-by" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Sort By
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by" className="w-full" aria-label="Sort streams">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                <SelectItem value="genre_asc">Genre (A-Z)</SelectItem>
                <SelectItem value="genre_desc">Genre (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredAndSortedStreams.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredAndSortedStreams.map(stream => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Search className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-xl font-semibold">No Streams Found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
