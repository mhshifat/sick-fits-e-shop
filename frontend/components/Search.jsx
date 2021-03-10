import { gql, useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import React from "react";
import { DropDown, DropDownItem, SearchStyles } from "./styles/DropDown";

const SEARCH_PRODUCTS_QUERY = gql`
	query searchProducts($searchTerm: String!) {
		searchTerms: allProducts(
			where: {
				OR: [
					{ name_contains_i: $searchTerm }
					{ description_contains_i: $searchTerm }
				]
			}
		) {
			id
			name
			photo {
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const Search = () => {
	resetIdCounter();
	const router = useRouter();
	const [findItems, { loading, error, data }] = useLazyQuery(
		SEARCH_PRODUCTS_QUERY,
		{
			fetchPolicy: "no-cache",
		}
	);
	const findItemsButChill = debounce(findItems, 350);
	const items = data?.searchTerms || [];
	const {
		isOpen,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		inputValue,
		getItemProps,
		highlightedIndex,
	} = useCombobox({
		items,
		onInputValueChange: () => {
			findItemsButChill({
				variables: {
					searchTerm: inputValue,
				},
			});
		},
		onSelectedItemChange: ({ selectedItem }) => {
			router.push({
				pathname: `/product/${selectedItem.id}`,
			});
		},
		itemToString: (item) => item?.name || "",
	});

	return (
		<SearchStyles>
			<div {...getComboboxProps()}>
				<input
					{...getInputProps({
						type: "search",
						placeholder: "Search for an item",
						className: loading ? "loading" : "",
						id: "search",
					})}
				/>
			</div>
			<DropDown {...getMenuProps()}>
				{isOpen &&
					items.map((item, ind) => (
						<DropDownItem
							key={item.name}
							highlighted={ind === highlightedIndex}
							{...getItemProps({ item })}
						>
							<img
								src={item.photo.image.publicUrlTransformed}
								alt={item.name}
								width="50"
							/>
							{item.name}
						</DropDownItem>
					))}
				{isOpen && !items.length && !loading && (
					<DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
				)}
			</DropDown>
		</SearchStyles>
	);
};

export default Search;
