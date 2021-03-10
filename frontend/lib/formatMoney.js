export default function formatMoney(ammount = 0) {
	const options = {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
	};

	if (ammount % 100 === 0) {
		options.minimumFractionDigits = 0;
	}

	const formatar = Intl.NumberFormat("en-US", options);
	return formatar.format(ammount / 100);
}
