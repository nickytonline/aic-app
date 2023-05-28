import './SearchForm.css';

export function SearchForm({ onSearchSubmit, query }) {
	return (
		<form className="Form" role="search" onSubmit={onSearchSubmit}>
			<input
				aria-label="Search for artworks"
				className="input"
				id="search-field"
				inputMode="search"
				name="query"
				type="text"
				value={query}
			/>
			<button className="button" type="submit">
				Search
			</button>
		</form>
	);
}
