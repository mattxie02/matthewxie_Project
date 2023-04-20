import { Table, Pagination, Spinner, Alert } from 'flowbite-react';
import { Character } from '@/services/types';
import usePaginatedTable from '@/hooks/usePaginatedTable';
import Link from 'next/link';

function Characters(): JSX.Element {
  const {data: characters, page, totalPages, loading, hasError, handlePageChange} = usePaginatedTable<Character>('/character');

  const renderTable = () => {
    return (
      <>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Birth
            </Table.HeadCell>
            <Table.HeadCell>
              Death
            </Table.HeadCell>
            <Table.HeadCell>
              Gender
            </Table.HeadCell>
            <Table.HeadCell>
              Race
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Wiki
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {characters.map(({ _id, name, birth, death, gender, race, wikiUrl }) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={_id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {name}
                </Table.Cell>
                <Table.Cell>
                  {birth}
                </Table.Cell>
                <Table.Cell>
                  {death}
                </Table.Cell>
                <Table.Cell>
                  {gender}
                </Table.Cell>
                <Table.Cell>
                  {race}
                </Table.Cell>
                <Table.Cell>
                  <Link href={wikiUrl} target="_blank" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Go to Wiki</Link>
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
          Characters
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

export default Characters;
