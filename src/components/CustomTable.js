import usePagination from 'hooks/usePagination';
import React, { useState } from 'react';
import {
	CardBody,
	Col,
	FormGroup,
	Input,
	Label,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
	Spinner,
	Table,
} from 'reactstrap';

let itemsList = [5, 10, 25, 50, 100];
const CustomTable = ({
	cols = [],
	rows = [],
	searchKeys = [],
	allowSearch = false,
	loading = false,
}) => {
	let [itemsPerPage, setItemsPerPage] = useState(5);
	const highlightText = (text, highlight) => {
		if (!highlight.trim()) {
			return text;
		}
		const regex = new RegExp(`(${highlight})`, 'gi');
		return text
			.toString()
			.split(regex)
			.map((part, i) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<span
						key={i}
						style={{ fontWeight: 'bold', background: '#E1E2E7' }}
					>
						{part}
					</span>
				) : (
					part
				)
			);
	};

	const getValue = (obj, key) => {
		const keys = key.split('.');
		return keys.reduce((acc, cur) => {
			return acc ? acc[cur] : undefined;
		}, obj);
	};

	let {
		currentPage,
		goToPage,
		nextPage,
		prevPage,
		firstPage,
		lastPage,
		getPaginatedData,
		getPaginationRange,
		searchTerm,
		updateSearchTerm,
		isFirstPage,
		isLastPage,
	} = usePagination({
		totalItems: rows.length,
		items: rows,
		itemsPerPage,
		searchKeys: searchKeys,
	});
	let data = getPaginatedData();

	return loading ? (
		<div className='d-flex py-4 justify-content-center'>
			<Spinner />
		</div>
	) : (
		<>
			{allowSearch ? (
				<CardBody className='pt-3 pb-0'>
					<Row>
						<Col md={4}>
							<FormGroup>
								<Label>Search</Label>
								<Input
									type='text'
									placeholder='Search'
									value={searchTerm}
									onChange={e =>
										updateSearchTerm(e.target.value)
									}
								></Input>
							</FormGroup>
						</Col>
					</Row>
				</CardBody>
			) : (
				''
			)}
			<Table responsive>
				<thead>
					<tr>
						{cols.map(col => (
							<th>{col.header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map(item => (
						<tr>
							{cols.map(col => {
								let fetchedItem = getValue(item, col.key);
								return (
									<td>
										{searchKeys.includes(col.key)
											? highlightText(
													fetchedItem,
													searchTerm
											  )
											: fetchedItem}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</Table>
			{data.length === 0 ? (
				<div className='py-3 d-flex align-items-center justify-content-center'>
					No Record found
				</div>
			) : (
				''
			)}
			<span></span>
			<hr className='m-0' />
			<CardBody className='d-flex align-items-center pb-0'>
				<FormGroup>
					<Label>Items per page</Label>
					<Input
						value={itemsPerPage}
						onChange={e => {
							setItemsPerPage(e.target.value);
							firstPage();
						}}
						type='select'
					>
						{itemsList.map(item => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</Input>
				</FormGroup>
				{data.length !== 0 && (
					<Pagination className='ml-auto'>
						<PaginationItem
							disabled={isFirstPage}
							onClick={firstPage}
						>
							<PaginationLink first />
						</PaginationItem>
						<PaginationItem
							disabled={isFirstPage}
							onClick={prevPage}
						>
							<PaginationLink previous />
						</PaginationItem>
						{getPaginationRange().map(page => (
							<PaginationItem
								active={page === currentPage}
								key={page}
								onClick={() => {
									goToPage(page);
								}}
							>
								<PaginationLink>{page}</PaginationLink>
							</PaginationItem>
						))}
						<PaginationItem
							disabled={isLastPage}
							onClick={nextPage}
						>
							<PaginationLink next />
						</PaginationItem>
						<PaginationItem
							disabled={isLastPage}
							onClick={lastPage}
						>
							<PaginationLink href='#' last />
						</PaginationItem>
					</Pagination>
				)}
			</CardBody>
		</>
	);
};

export default CustomTable;
