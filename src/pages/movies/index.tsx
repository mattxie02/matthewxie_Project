import { Table, Pagination, Spinner, Alert } from 'flowbite-react';
import { Movie } from '@/services/types';
import usePaginatedTable from '@/hooks/usePaginatedTable';

function Movies(): JSX.Element {
  const {data: movies, page, totalPages, loading, hasError, handlePageChange} = usePaginatedTable<Movie>('/movie');

  const renderTable = () => {
    return (
      <>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Duration
            </Table.HeadCell>
            <Table.HeadCell>
              Academy award wins
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {movies.map(({ _id, name, runtimeInMinutes, academyAwardWins }) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={_id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {name}
                </Table.Cell>
                <Table.Cell>
                  {runtimeInMinutes}
                </Table.Cell>
                <Table.Cell>
                  {academyAwardWins}
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
          Movies
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

export default Movies;
