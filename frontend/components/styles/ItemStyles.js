import styled from "styled-components";

const ItemStyles = styled.div`
	background: white;
	border: 1px solid var(--offWhite);
	box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	position: relative;
	display: flex;
	flex-direction: column;
	img {
		width: 100%;
		height: 400px;
		object-fit: cover;
	}
	p {
		line-height: 2;
		font-weight: 300;
		flex-grow: 1;
		padding: 0 3rem;
		font-size: 1.5rem;
	}
	.buttonList {
		display: grid;
		width: 100%;
		border-top: 1px solid var(--lightGray);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		grid-gap: 1px;
		background: var(--lightGray);
		& > * {
			background: white;
			border: 0;
			font-size: 1rem;
			padding: 1rem;
		}
	}
`;

export default ItemStyles;
