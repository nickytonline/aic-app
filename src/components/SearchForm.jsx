import './SearchForm.css';

export function SearchForm({ onSearchSubmit, query }) {
	return (
		<form className="Form" role="search" onSubmit={onSearchSubmit}>
			<input
				aria-label="Search for artworks"
				className="input"
				default={query}
				id="search-field"
				inputMode="search"
				name="query"
				type="text"
			/>
			<button className="button" type="submit">
				Search
			</button>
		</form>
	);
}
