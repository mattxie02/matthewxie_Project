import { fetchItems } from '@/services';
import { useState, useEffect } from 'react';
import { PAGE_LIMIT } from '@/const';

const usePaginatedTable = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);
  useEffect(() => {
    const fetchLotrData = async () => {
      try {
        const {docs, pages} = await fetchItems<T>(url, PAGE_LIMIT, page);
        setData(docs);
        setTotalPages(pages);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    setLoading(true);
    fetchLotrData();
  }, [url, page]);

  const handlePageChange = (_page: number) => {
    setPage(_page);
  };

  return {data, page, totalPages, setLoading, loading, setError, hasError, handlePageChange};
}

export default usePaginatedTable;
