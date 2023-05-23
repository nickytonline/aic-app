import { useState } from 'react';

import { searchArtworks } from '../api';
import { SearchForm } from './SearchForm';
import { Footer } from './Footer';

import './App.css';
import { ArtResults } from './ArtResults';

export function App() {
	const [artworks, setArtworks] = useState();

	function onSearchSubmit(query) {
		// don't make too many requests to the API! Once we've built out
		// our UI, we need to make real requests!
		// @see: ./src/api.js
		searchArtworks(query).then((searchResults) => {
			setArtworks(searchResults?.data);
		});
	}

	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			{artworks ? <ArtResults artworks={artworks} /> : null}
			<Footer />
		</div>
	);
}
