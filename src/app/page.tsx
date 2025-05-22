'use client';

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StreamCard } from '@/components/stream-card'; // Conceptually, this card now shows a TV Channel
import { mockStreams, genres as allGenres, languages as allLanguages, qualities as allQualities } from '@/lib/data';
import type { Stream as Channel } from '@/lib/types'; // Using Stream as Channel type
import { Search, SlidersHorizontal, ArrowDownUp, Tv2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [sortBy, setSortBy] = useState('title_asc');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredAndSortedChannels = useMemo(() => {
    let channels: Channel[] = [...mockStreams];

    if (searchTerm) {
      channels = channels.filter(channel =>
        channel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        channel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      channels = channels.filter(channel => channel.genre === selectedGenre);
    }
    if (selectedLanguage !== 'all') {
      channels = channels.filter(channel => channel.language === selectedLanguage);
    }
    if (selectedQuality !== 'all') {
      channels = channels.filter(channel => channel.quality === selectedQuality);
    }

    channels.sort((a, b) => {
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

    return channels;
  }, [searchTerm, selectedGenre, selectedLanguage, selectedQuality, sortBy]);

  if (!mounted) {
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
        Descubra Seu Próximo Canal Favorito
      </h1>

      <div className="mb-8 space-y-4 rounded-lg border bg-card p-4 shadow-sm md:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar canais por nome, programa ou palavra-chave..."
            className="w-full rounded-md bg-background py-3 pl-10 text-base focus:ring-accent"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Buscar canais"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label htmlFor="genre-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Categoria
            </Label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-filter" className="w-full" aria-label="Filtrar por categoria">
                <SelectValue placeholder="Filtrar por Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="language-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
               <SlidersHorizontal className="mr-2 h-4 w-4" /> Idioma
            </Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger id="language-filter" className="w-full" aria-label="Filtrar por idioma">
                <SelectValue placeholder="Filtrar por Idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Idiomas</SelectItem>
                {allLanguages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quality-filter" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
               <SlidersHorizontal className="mr-2 h-4 w-4" /> Qualidade
            </Label>
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger id="quality-filter" className="w-full" aria-label="Filtrar por qualidade">
                <SelectValue placeholder="Filtrar por Qualidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Qualidades</SelectItem>
                {allQualities.map(qual => (
                  <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="sort-by" className="mb-1.5 flex items-center text-sm font-medium text-muted-foreground">
              <ArrowDownUp className="mr-2 h-4 w-4" /> Ordenar Por
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by" className="w-full" aria-label="Ordenar canais">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title_asc">Título (A-Z)</SelectItem>
                <SelectItem value="title_desc">Título (Z-A)</SelectItem>
                <SelectItem value="genre_asc">Categoria (A-Z)</SelectItem>
                <SelectItem value="genre_desc">Categoria (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredAndSortedChannels.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredAndSortedChannels.map(channel => (
            <StreamCard key={channel.id} stream={channel} /> // Passing channel as stream prop
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Tv2 className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-xl font-semibold">Nenhum Canal Encontrado</p>
          <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
        </div>
      )}
    </div>
  );
}
