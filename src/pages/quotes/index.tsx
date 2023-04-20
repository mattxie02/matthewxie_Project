import { Table, Pagination, Spinner, Alert } from 'flowbite-react';
import { Character, Movie, Quote } from '@/services/types';
import usePaginatedTable from '@/hooks/usePaginatedTable';
import { useEffect, useState } from 'react';
import { fetchItem } from '@/services';
import Link from 'next/link';

function Quotes(): JSX.Element {
  const {data: quotes, page, totalPages, setLoading, loading, setError, hasError, handlePageChange} = usePaginatedTable<Quote>('/quote');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchMoviesAndCharacters = async () => {
      try {
        const moviePromises = quotes.map(({movie}) => fetchItem<Movie>('/movie', movie));
        const characterPromises = quotes.map(({character}) => fetchItem<Character>('/character', character));
        const _movies = await Promise.all(moviePromises);
        const _characters = await Promise.all(characterPromises);
        setMovies(_movies);
        setCharacters(_characters);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    }
    setLoading(true);
    fetchMoviesAndCharacters();
  }, [quotes, setError, setLoading]);

  const renderTable = () => {
    return (
      <>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Dialog
            </Table.HeadCell>
            <Table.HeadCell>
              Movie
            </Table.HeadCell>
            <Table.HeadCell>
              Character
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {quotes.map(({ _id, dialog }, index) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={_id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white max-w-lg">
                  <p className='truncate'>{dialog}</p>
                </Table.Cell>
                <Table.Cell>
                  {movies[index]?.name}
                </Table.Cell>
                <Table.Cell>
                  <Link href={characters[index]?.wikiUrl ?? '/'} target="_blank" className="font-medium text-blue-600 hover:underline dark:text-blue-500">{characters[index]?.name}</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Pagination
          className='self-end mt-3'
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <div className="p-6">
      <header>
        <h1 className="mb-6 text-5xl font-extrabold dark:text-white text-gray-900">
          Quotes
        </h1>
      </header>
      <div className='flex flex-col w-full text-center'>
        {!loading && !hasError && renderTable()}
        {loading && <Spinner color="success" size='xl'/>}
        {hasError && (
          <Alert
            color="failure"
          >
            <span>
              There has been an error while fetching the data.
            </span>
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Quotes;
