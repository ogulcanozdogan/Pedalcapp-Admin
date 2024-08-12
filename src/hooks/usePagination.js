import { useState } from 'react';

const usePagination = ({
	totalItems,
	itemsPerPage,
	items,
	searchKeys,
	initialPage = 1,
}) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [searchTerm, setSearchTerm] = useState('');
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const goToPage = page => {
		if (page < 1) page = 1;
		if (page > Number(totalPages)) page = Number(totalPages);
		setCurrentPage(page);
	};

	const nextPage = () => {
		setCurrentPage(prevPage => Math.min(prevPage + 1, Number(totalPages)));
	};

	const prevPage = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
	};

	const firstPage = () => {
		setCurrentPage(1);
	};

	const lastPage = () => {
		setCurrentPage(Number(totalPages));
	};

	const updateSearchTerm = term => {
		setSearchTerm(term);
		setCurrentPage(1);
	};
	const getValue = (obj, key) => {
		const keys = key.split('.');
		return keys.reduce((acc, cur) => {
			return acc ? acc[cur] : undefined;
		}, obj);
	};
	const getPaginatedData = () => {
		const startIndex = (currentPage - 1) * Number(itemsPerPage);
		const endIndex = Number(startIndex) + Number(itemsPerPage);

		return items
			.slice(startIndex, endIndex)
			.map((item, index) => ({
				...item,
				srNumber: startIndex + index + 1,
			}))
			.filter(item => {
				if (searchTerm === '') {
					return true;
				}
				let conditions = searchKeys.map(searchKey => {
					let fetchedItem = getValue(item, searchKey);
					return fetchedItem
						.toLowerCase()
						.includes(searchTerm.toLowerCase());
				});
				return conditions.some(condition => condition === true);
			});
	};

	const getPaginationRange = () => {
		const range = [];
		for (let i = 1; i <= totalPages; i++) {
			range.push(i);
		}
		return range;
	};

	return {
		currentPage,
		totalPages,
		goToPage,
		nextPage,
		prevPage,
		firstPage,
		lastPage,
		getPaginatedData,
		getPaginationRange,
		isFirstPage: currentPage === 1,
		isLastPage: currentPage === totalPages,
		searchTerm,
		updateSearchTerm,
	};
};

export default usePagination;
